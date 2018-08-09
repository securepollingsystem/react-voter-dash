import React, { Component } from 'react';
import Calendar from "react-calendar";
//import Calendar from "react-calendar/dist/entry.nostyle";

import moment from "moment";

import "./AppointmentSelectionWidget.css"

const DATE_FORMAT="MM/DD/YYYY";

class AppointmentSelectionWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentView: "time-selector",
            selectedDate: moment().format(DATE_FORMAT)
        };

        this.onSelectDate = this.onSelectDate.bind(this);
        this.onSelectTime = this.onSelectTime.bind(this);
        this.goBack = this.goBack.bind(this);

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

    }

    goBack() {
        this.setState(previousState => {
            var newState = previousState;
            newState.currentView = "time-selector";
            return newState;
        })
    }

    render() {

        let timesDiv = (
            <div>
            {this.getAvailableTimes(this.state.selectedDate).map(time => {
                return (
                    <div style={{border: "solid 1px #ccc", marginBottom: "10px"}} onClick={this.onSelectTime}>{time}</div>
                );
            })}
            </div>
        );

        return (
            <div className="AppointmentSelectionWidget">
                <div className="appointment-time-selector" style={{display: this.state.currentView == "time-selector" ? "" : "none"}}>
                    <table className="calendar-table"><tr>
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
                    </tr></table>
                </div>
                <div className="appointment-form" style={{display: this.state.currentView == "form" ? "block" : "none"}}>
                    <button className="back-button" style={{position: "absolute", top: "10px", left: "10px"}} onClick={this.goBack}>Back</button>
                    <h3 className="form-style-2-heading">Enter Your Identification Details</h3>
                    <form onSubmit={this.onSubmit}>
                        <label for="appointment-form-email">Email Address<span className="required">*</span></label><input id="appointment-form-email" type="email" placeholder="Enter Email Address"></input>
                        <label for="appointment-form-first-name">First Name<span className="required">*</span></label><input id="appointment-form-first-name" type="text" placeholder="Enter First Name"></input>
                        <label for="appointment-form-last-name">Last Name<span className="required">*</span></label><input id="appointment-form-last-name" type="text" placeholder="Enter Last Name"></input>
                        <h4>Confirm Appointment on {this.state.selectedDate} at {this.state.selectedTime}</h4>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AppointmentSelectionWidget;


