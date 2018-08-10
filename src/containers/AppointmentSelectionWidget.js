import React, { Component } from 'react';

import Calendar from "react-calendar";
//import Calendar from "react-calendar/dist/entry.nostyle";
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as actions from '../actions';

import { bookAppointment, createFakeTimeSlots } from "../utils";
import {blindPublicKey} from "../utils/crypto";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from "moment";
import bluebird from "bluebird";

import "./AppointmentSelectionWidget.css"

const DATE_FORMAT="MM/DD/YYYY";
const TIME_FORMAT="hh:mm a";

const views = {
    timeSelector: "time-selector",
    form: "form"
}


class AppointmentSelectionWidget extends Component {

    constructor(props) {
        super(props);

        console.log("PROPS", props);
        var currentView = views.timeSelector;

        this.state = {
            currentView,
            selectedDate: moment().format(DATE_FORMAT),
            selectedTimeSlot: null
        };

        this.fetchTimeSlots.bind(this)();

        this.onSelectDate = this.onSelectDate.bind(this);
        this.selectTimeSlot = this.selectTimeSlot.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    getDisabled(date) {
        return Math.random() > 0.8;
    }

    onSelectDate(date) {
        console.log("onSelectDate()", date);
        this.setState(previousState => {
            var newState = previousState;
            newState.selectedDate = moment(date).format(DATE_FORMAT);
            return newState;
        })
    }

    getAvailableTimeSlots(date) {
        console.log("getAvailableTimeSlots()", date);

        if (!date || !this.state.timeSlots) {
            return [];
        }

        // 1 <= n <= 5
        //var numTimeSlots = Math.floor((Math.random() * 4) + 1);
        //var timeSlots = createFakeTimeSlots(numTimeSlots);
        //timeSlots = timeSlots.sort((a, b) => b.datetime - a.datetime)
        //return timeSlots;
        

        var timeSlots = this.state.timeSlots.filter(timeSlot => {
            return moment(timeSlot.datetime).isSame(moment(date), "day");
        })


        return timeSlots;

    }

    // fetch timeslots from server and save to state
    fetchTimeSlots() {
        //axios.get("/time-slots")
        bluebird.resolve(createFakeTimeSlots(10)).delay(1000)
            .then(timeSlots => {
                this.setState(function(previousState) {
                    var newState = previousState;
                    newState.timeSlots = timeSlots;
                    return newState;
                })
            })
    }

    selectTimeSlot(timeSlot) {
        console.log("selectTimeSlot()", timeSlot);
        this.setState(previousState => {
            var newState = previousState;
            newState.selectedTimeSlot = timeSlot;
            newState.currentView = views.form;
            return newState;
        })
    }

    onSubmit(event) {
        event.preventDefault();

        var publicKey = this.props.keys.public;
        var {blinded, r} = blindPublicKey(publicKey);

        var bookingDateTime = 0;
        //create booking
        var bookingArgs = {
            timeSlot: this.state.selectedTimeSlot,
            personalId: {
                firstName: "First Name",
                lastName: "lastName",
                email: "email"
            },
            blindedKey: blinded.toString()
        };
        bookAppointment(bookingArgs)
            .then(booking => {
                console.log("GOT BOOKING", booking);
                toast("Appointment Successfully Booked");
                this.props.setBooking(booking);
                this.setState(previousState => {
                    var newState = previousState;
                    newState.currentView = views.timeSelector;
                    return newState;
                })
            })

    }

    goBack() {
        this.setState(previousState => {
            var newState = previousState;
            newState.currentView = views.timeSelector;
            return newState;
        })
    }

    render() {

        //if (this.props.bookings.booking) this.setState(currentView = "success");

        var view;

        if (this.state.currentView == views.timeSelector) {

            let timesDiv = (
                <div>
                {this.getAvailableTimeSlots(moment(this.state.selectedDate, DATE_FORMAT)).map(timeSlot => {
                    return (
                        <div key={timeSlot.id} style={{border: "solid 1px #ccc", marginBottom: "10px", cursor: "pointer", padding: "5px"}} onClick={() => this.selectTimeSlot(timeSlot)}>{moment(timeSlot.datetime).format(TIME_FORMAT)}</div>
                    );
                })}
                </div>
            );

            view = (
                <div className="appointment-time-selector">
                    <table className="calendar-table"><tbody><tr>
                        <td>
                            <h3>Select A Date</h3>
                        </td>
                        <td>
                            <h3>Available Times</h3>
                        </td>
                    </tr><tr>
                        <td>
                            <div className="calendar">
                                <Calendar
                                        tileDisabled={this.getDisabled}
                                        minDate={moment().toDate()}
                                        onChange={this.onSelectDate}
                                        value={moment(this.state.selectedDate, DATE_FORMAT).toDate()}
                                />
                            </div>
                        </td>
                        <td>
                            <div className="times">
                                {timesDiv}
                            </div>
                        </td>
                    </tr></tbody></table>
                </div>
            );
        
        }
        else if (this.state.currentView == views.form) {

            view = (
                <div className="appointment-form">
                    <button className="back-button" style={{position: "absolute", top: "10px", left: "10px"}} onClick={this.goBack}>Back</button>
                    <h3>Enter Your Identification Information</h3>
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="appointment-form-email">Email Address<span className="required">*</span></label><input id="appointment-form-email" type="email" placeholder="Enter Email Address"></input>
                        <label htmlFor="appointment-form-first-name">First Name<span className="required">*</span></label><input id="appointment-form-first-name" type="text" placeholder="Enter First Name"></input>
                        <label htmlFor="appointment-form-last-name">Last Name<span className="required">*</span></label><input id="appointment-form-last-name" type="text" placeholder="Enter Last Name"></input>
                        <h4>Confirm Appointment on {moment(this.state.selectedTimeSlot.datetime).format(DATE_FORMAT)} at {moment(this.state.selectedTimeSlot.datetime).format(TIME_FORMAT)}</h4>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            );
        
        }
        else {
            view = (<div>An error has occured</div>)
        }

        // if there is a booking stored, they have already completed the process so display the success screen
        var booking = this.props.bookings.booking;
        if (booking) {
            view = (
                <div>
                    <h3>Success!</h3>
                    <div>
                        <p style={{maxWidth: "80%", margin: "auto"}}>
                            Please arrive at the registrar's office {moment(booking.datetime).format("LLLL")} with a valid id
                        </p>
                        <Calendar
                                tileDisabled={date => !moment(date.date).isSame(moment(booking.datetime), "day")}
                                tileClassName={date => {
                                        return moment(date.date).isAfter(moment()) ? "normal" : "disabled";
                                }}
                                value={moment(booking.datetime).toDate()} />
                    </div>
                    <button onClick={this.props.removeBooking}>Clear Booking</button>
                </div>
            );
        }

        return (
            <div className="AppointmentSelectionWidget">
                {view}
                <ToastContainer autoClose={3000} hideProgressBar={true} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {  
    console.log("AppointmentSelectionWidget mapStateToProps()", state, ownProps);
    return {keys: state.keys, bookings: state.bookings};
}

function mapDispatchToProps(dispatch) {  
    console.log("AppointmentSelectionWidget mapDispatchToProps()", dispatch);
    return bindActionCreators(actions, dispatch);
}

console.log("AppointmentSelectionWidget", AppointmentSelectionWidget.views);

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSelectionWidget);

