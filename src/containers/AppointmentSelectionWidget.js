import React, { Component } from 'react';

import Calendar from "react-calendar";
//import Calendar from "react-calendar/dist/entry.nostyle";
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as actions from '../actions';

import { bookAppointment } from "../utils";
import {blindPublicKey} from "../utils/crypto";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import moment from "moment";

import "./AppointmentSelectionWidget.css"

const DATE_FORMAT="MM/DD/YYYY";

class AppointmentSelectionWidget extends Component {

    constructor(props) {
        super(props);

        console.log("PROPS", props);
        var currentView = "time-selector";
        if (props.bookings.booking) currentView = "success";

        this.state = {
            currentView,
            selectedDate: moment().format(DATE_FORMAT)
        };

        this.onSelectDate = this.onSelectDate.bind(this);
        this.onSelectTime = this.onSelectTime.bind(this);
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

    getAvailableTimes(date) {
        console.log("getAvailableTimes()", date);

        if (!date) {
            return [];
        }

        var numTimes = Math.floor((Math.random() * 4) + 1);
        var times = Array(numTimes).fill(null).map(n => {
            let time = moment(date);
            time.hour(9 + Math.floor(Math.random() * 8))
            time.minute(15 * Math.floor((Math.random() * 4)));
            return time.format("hh:mm a");
        })

        return times;
    }

    onSelectTime(event) {
        console.log("onSelectTime()", event.target.innerText);
        var time = event.target.innerText;
        this.setState(previousState => {
            var newState = previousState;
            newState.selectedTime = time;
            newState.currentView = "form";
            return newState;
        })
    }

    onSubmit(event) {
        event.preventDefault();

        console.log("PROPS", this.props);
        var publicKey = this.props.keys.public;
        var {blinded, r} = blindPublicKey(publicKey);
        console.log("blindedKey", blinded);

        function getTimeSlot() {
            return {id: "time_slot_id", date: moment().toDate()};
        }
        //create booking
        var bookingArgs = {
            timeSlot: getTimeSlot(),
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
                    newState.currentView = "success";
                    return newState;
                })
            })

    }

    goBack() {
        this.setState(previousState => {
            var newState = previousState;
            newState.currentView = "time-selector";
            return newState;
        })
    }

    render() {

        //if (this.props.bookings.booking) this.setState(currentView = "success");

        let timesDiv = (
            <div>
            {this.getAvailableTimes(moment(this.state.selectedDate, DATE_FORMAT)).map(time => {
                return (
                    <div style={{border: "solid 1px #ccc", marginBottom: "10px", cursor: "pointer", padding: "5px"}} onClick={this.onSelectTime}>{time}</div>
                );
            })}
            </div>
        );


        var timeSelectorView = (
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

        var formView = (
            <div className="appointment-form">
                <button className="back-button" style={{position: "absolute", top: "10px", left: "10px"}} onClick={this.goBack}>Back</button>
                <h3>Enter Your Identification Information</h3>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="appointment-form-email">Email Address<span className="required">*</span></label><input id="appointment-form-email" type="email" placeholder="Enter Email Address"></input>
                    <label htmlFor="appointment-form-first-name">First Name<span className="required">*</span></label><input id="appointment-form-first-name" type="text" placeholder="Enter First Name"></input>
                    <label htmlFor="appointment-form-last-name">Last Name<span className="required">*</span></label><input id="appointment-form-last-name" type="text" placeholder="Enter Last Name"></input>
                    <h4>Confirm Appointment on {this.state.selectedDate} at {this.state.selectedTime}</h4>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );


        var view;
        console.log("CURRENT VIEW", this.state.currentView);
        switch (this.state.currentView) {
            case "time-selector":
                view = timeSelectorView;
                break;
            case "form":
                view = formView;
                break;
            case "success":
                view = (
                    <div>
                        <h3>Success!</h3>
                        <div>Booking: 
                            <pre style={{textAlign: "left"}}>{JSON.stringify(this.props.bookings.booking, null, 2)}</pre>
                        </div>
                        <button onClick={this.props.removeBooking}>Clear Booking</button>
                    </div>
                );
                break;
            default:
                view = (<div>An error has occured</div>)
        }

        return (
            <div className="AppointmentSelectionWidget">
                {view}
                <ToastContainer autoClose={3000} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSelectionWidget);

