import React, { Component } from 'react';

import moment from "moment";

import { DATE_FORMAT, TIME_FORMAT } from "../constants";


class AppointmentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            valid: false,
            formData: {}
        };

        this.formRef = React.createRef();

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onInputChange(e) {
        var input = e.target;
        console.log("FORMREF", this.formRef);
        var valid = this.formRef.current.checkValidity();
        console.log("isValid", valid);
    
        this.setState(previousState => {
            var newState = previousState;
            newState.formData[input.name] = input.value;
            newState.valid = valid;
            return newState;
        })

    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.formData);
    }

    render() {

        var timeSlot = this.props.timeSlot;

        return (
            <div className="AppointmentForm">
                <h3>Enter Your Identification Information</h3>
                <form ref={this.formRef} onSubmit={this.onSubmit}>
                    <label htmlFor="appointment-form-email">Email Address<span className="required">*</span></label>
                    <input id="appointment-form-email" type="email" name="email" onChange={this.onInputChange} required={true} placeholder="Enter Email Address"></input>
                    <label htmlFor="appointment-form-first-name">First Name<span className="required">*</span></label>
                    <input id="appointment-form-first-name" type="text" name="firstName" onChange={this.onInputChange} required={true} placeholder="Enter First Name"></input>
                    <label htmlFor="appointment-form-last-name">Last Name<span className="required">*</span></label>
                    <input id="appointment-form-last-name" type="text" name="lastName" onChange={this.onInputChange} required={true} placeholder="Enter Last Name"></input>
                    <h4>Confirm Appointment on {moment(timeSlot.datetime).format(DATE_FORMAT)} at {moment(timeSlot.datetime).format(TIME_FORMAT)}</h4>
                    <button type="submit" disabled={!this.state.valid}>Submit</button>
                </form>
            </div>
        );
    }
}

export default AppointmentForm;
