import React, { Component } from 'react';

import moment from "moment";

import { DATE_FORMAT, TIME_FORMAT } from "../constants";


class AppointmentForm extends Component {

    render() {

        var timeSlot = this.props.timeSlot;

        return (
            <div className="AppointmentForm">
                <h3>Enter Your Identification Information</h3>
                <form onSubmit={this.props.onSubmit}>
                    <label htmlFor="appointment-form-email">Email Address<span className="required">*</span></label><input id="appointment-form-email" type="email" placeholder="Enter Email Address"></input>
                    <label htmlFor="appointment-form-first-name">First Name<span className="required">*</span></label><input id="appointment-form-first-name" type="text" placeholder="Enter First Name"></input>
                    <label htmlFor="appointment-form-last-name">Last Name<span className="required">*</span></label><input id="appointment-form-last-name" type="text" placeholder="Enter Last Name"></input>
                    <h4>Confirm Appointment on {moment(timeSlot.datetime).format(DATE_FORMAT)} at {moment(timeSlot.datetime).format(TIME_FORMAT)}</h4>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AppointmentForm;
