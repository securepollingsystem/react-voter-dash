import React, { Component } from 'react';

import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as actions from '../actions';

import { bookAppointment, createFakeTimeSlots } from "../utils";
import {blindPublicKey} from "../utils/crypto";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import bluebird from "bluebird";

import "./AppointmentSelectionWidget.css"

import TimeSlotSelection from "../components/TimeSlotSelection";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentBookingSuccess from "../components/AppointmentBookingSuccess";


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
            timeSlots: [],
            selectedTimeSlot: null
        };

        this.fetchTimeSlots.bind(this)();

        this.selectTimeSlot = this.selectTimeSlot.bind(this);
        this.changeView = this.changeView.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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
        this.props.setBlindedR(r);

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
                toast("Appointment Successfully Booked");
                this.props.setBooking(booking);
                this.setState(previousState => {
                    var newState = previousState;
                    newState.currentView = views.timeSelector;
                    return newState;
                })
            })

    }

    changeView(view) {
        this.setState(previousState => {
            var newState = previousState;
            newState.currentView = view;
            return newState;
        })
    }

    render() {

        var view;
        if (this.state.currentView === views.timeSelector) {
            view = <TimeSlotSelection timeSlots={this.state.timeSlots} onSelectTimeSlot={this.selectTimeSlot} />
        }
        else if (this.state.currentView === views.form) {
            view = (
                <div>
                    <button className="back-button" style={{position: "absolute", top: "10px", left: "10px"}} onClick={() => this.changeView(views.timeSelector)}>Back</button>
                    <AppointmentForm timeSlot={this.state.selectedTimeSlot} onSubmit={this.onSubmit} />
                </div>
            );
        }
        else {
            view = (<div>An error has occured</div>)
        }

        // if there is a booking stored, they have already completed the process so display the success screen
        var booking = this.props.bookings.booking;
        if (booking) {
            view = <AppointmentBookingSuccess booking={booking} removeBooking={this.props.removeBooking} />
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
    return {keys: state.keys, bookings: state.bookings};
}

function mapDispatchToProps(dispatch) {  
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSelectionWidget);

