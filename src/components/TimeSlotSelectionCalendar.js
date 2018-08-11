import React, { Component } from 'react';

import Calendar from "react-calendar";
//import Calendar from "react-calendar/dist/entry.nostyle";
import { filterTimeSlotsByDate } from "../utils/time-slot";

import moment from "moment";

import { DATE_FORMAT } from "../constants";


class TimeSlotSelectionCalendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: moment().format(DATE_FORMAT),
        };

        this.getDisabled = this.getDisabled.bind(this);
        this.onSelectDate = this.onSelectDate.bind(this);

    }

    getDisabled(date) {
        console.log("getDisabled()", date);
        var dateTimeSlots = filterTimeSlotsByDate(date.date, this.props.timeSlots);
        return dateTimeSlots.length === 0;
    }

    onSelectDate(date) {
        console.log("onSelectDate()", date);
        this.setState(previousState => {
            var newState = previousState;
            newState.selectedDate = moment(date).format(DATE_FORMAT);
            return newState;
        })
        this.props.onSelectDate(date);
    }

    render() {

        //if (this.props.bookings.booking) this.setState(currentView = "success");


        return (
            <Calendar
                    tileDisabled={this.getDisabled}
                    minDate={moment().toDate()}
                    onChange={this.onSelectDate}
                    value={moment(this.state.selectedDate, DATE_FORMAT).toDate()}
            />
        );
    }
}


export default TimeSlotSelectionCalendar;

