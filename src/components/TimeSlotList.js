import React, { Component } from 'react';

import moment from "moment";

import { TIME_FORMAT } from "../constants";


class TimeSlotList extends Component {

    render() {

        return (
            <div>
                {this.props.timeSlots.map(timeSlot => {
                    return (
                        <div
                                key={timeSlot.id}
                                style={{
                                    border: "solid 1px #ccc", 
                                    marginBottom: "10px", 
                                    cursor: "pointer", 
                                    padding: "5px"
                                }}
                                onClick={() => this.props.onSelectTimeSlot(timeSlot)}>{moment(timeSlot.datetime).format(TIME_FORMAT)}
                        </div>
                    );
                })}
            </div>
        );
    }
}


export default TimeSlotList;

