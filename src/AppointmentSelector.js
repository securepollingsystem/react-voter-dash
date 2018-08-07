import React, { Component } from 'react';
import Calendar from "react-calendar";
//import Calendar from "react-calendar/dist/entry.nostyle";

import moment from "moment";

import "./AppointmentSelector.css"

class AppointmentSelector extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentView: "time-selector"
        };

        this.onSelectDate = this.onSelectDate.bind(this);
        this.onSelectTime = this.onSelectTime.bind(this);

    }

    onSelectDate(date) {
        console.log("onSelectDate()", date);
        this.setState(previousState => {
            var newState = previousState;
            newState.selectedDate = moment(date).format("MM/DD/YYYY");
            return newState;
        })
    }

    ////API
    getTimeSlots() {
        // [{date: YYYY-MM-DD, times: ["10:00", "14:00"]}
        return;
    }
    getAvailableAppointments() {
        var today = moment();
        var firstDayOfMonth = today.startOf("month");
        var daysInMonth = moment().daysInMonth();
        var numDates = Math.floor(Math.random() * (daysInMonth - 1)) + 1;
        var dates = Array(numDates).fill(null).map(function(e, i) {
                return Math.floor(Math.random() * daysInMonth - 1);
            })
        console.log("dates", dates);
        dates = dates.filter(function(dateNum, pos) {
                return dates.indexOf(dateNum) == pos;
            })
        dates = dates.map(function(dateNum) {
            return moment().startOf("month").add(dateNum, "days");
        })
        console.log("dates", dates);
        dates = dates.map(function(date) {return date.toDate();})
        //dates = dates.map(function(date) {return date.toLocaleString();})
        console.log("dates", dates);
        return [dates[0], dates[1]];
    }

    getTileClassName(date) {
        if (Math.random() > 0.8) {
            return "available";
        }
        return "unavailable";
    }
    getDisabled(date) {
        return Math.random() > 0.8;
    }

    bookAppointment() {
        
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
            <div className="AppointmentSelector">
                <div className="time-selector" style={{display: this.state.currentView == "time-selector" ? "flex" : "none"}}>
                    <div className="calendar">
                        <h3>Select A Date</h3>
                        <Calendar
                                tileDisabled={this.getDisabled}
                                minDate={moment().toDate()}
                                onChange={this.onSelectDate}
                        />
                    </div>
                    <div className="times">
                        <h3>Available Times</h3>
                        {timesDiv}
                    </div>
                </div>
                <div className="form" style={{display: this.state.currentView == "form" ? "initial" : "none"}}>
                    <h3>Enter Your Identification Details</h3>
                    <form onSubmit={this.onSubmit}>
                        <input placeholder="First Name"></input>
                        <input placeholder="Last Name"></input>
                        <h4>Confirm Appointment on {this.state.selectedDate} at {this.state.selectedTime}</h4>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AppointmentSelector;

