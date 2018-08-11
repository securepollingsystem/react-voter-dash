import React, { Component } from 'react';

import TimeSlotSelectionCalendar from "../components/TimeSlotSelectionCalendar";
import TimeSlotList from "../components/TimeSlotList.js";

import { filterTimeSlotsByDate } from "../utils/time-slot";

import moment from "moment";

import { DATE_FORMAT } from "../constants";


class TimeSlotSelection extends Component {

    constructor(props) {
        super(props);

        console.log("PROPS", props);

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
    }

    render() {

        //if (this.props.bookings.booking) this.setState(currentView = "success");


        return (
            <div className="TimeSlotSelection">
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
                        <TimeSlotSelectionCalendar
                                timeSlots={this.props.timeSlots}
                                onSelectDate={this.onSelectDate}/>
                        </div>
                    </td>
                    <td>
                        <div className="time-slot-list">

                            <TimeSlotList
                                    timeSlots={filterTimeSlotsByDate(moment(this.state.selectedDate, DATE_FORMAT), this.props.timeSlots)}
                                    onSelectTimeSlot={this.props.onSelectTimeSlot}
                            />
                        </div>
                    </td>
                </tr></tbody></table>
            </div>
        );
    }
}


export default TimeSlotSelection;

