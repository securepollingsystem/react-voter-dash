import React, { Component } from 'react';

import Calendar from "react-calendar";
import { makeid } from "../utils";

import bluebird from "bluebird";
import moment from "moment";

class AppointmentBookingSuccess extends Component {

    constructor(props) {
        super(props);

        this.checkVerified = this.checkVerified.bind(this);

    }

    checkVerified() {
        
        //utils.fetchSignedKey()
        bluebird.resolve(makeid(200)).delay(1000)
            .then(signedKey => {
                //this.props.setKeys({publicSigned: signedKey})
                this.props.onVerified(signedKey);
            })

    }

    render() {

        var booking = this.props.booking;

        return (
            <div className="BookingSuccess">
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
                <button onClick={this.checkVerified}>Check Verified</button>
            </div>
        );
    }
}

export default AppointmentBookingSuccess;
