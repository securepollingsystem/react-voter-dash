import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Calendar from "react-calendar";

import crypto from "crypto";
import keypair from "keypair";
import moment from "moment";

window.crypto2 = crypto;
window.keypair = keypair;
window.moment = moment;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.generateKeyPair = this.generateKeyPair.bind(this);
    }

    generateKeyPair() {
        console.log("GENERATE KEY PAIR");
        var keys = keypair();
        console.log(keys);
        this.setState((previousState) => {
            var newState = previousState;
            newState.keys = keys;
            return newState;
        })
    }

    onSelectDate(date) {
        console.log("onSelectDate()", date);
    }

    //API
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
        
    }

    scheduleAppointment() {
        
    }

    getSessionKey() {
    
    }

    generateSalt() {
    
    }

    generateBlob(salt, publicKey, sessionKey) {
    
    }
    
    //
    sendBlobAndAppointment() {
    
    }

    // keep checking for signed key
    pollRegistrar() {
        // receive signed blob from registrar
        // unblind blob from registrar
    }

    render() {

        var publicKey = (this.state.keys || {}).public;
        var privateKey = (this.state.keys || {}).private;
        var keysDiv = (
            <div className="keys">
                <div className="public-key">
                    <div>Public:</div>
                    <div className="key">
                        {publicKey}
                    </div>
                </div>
                <div className="private-key">
                    <div>Private:</div>
                    <div className="key">
                        {privateKey}
                    </div>
                </div>
            </div>
        );

        return (
            <div className="App">
                <header>
                    <h1>Secure Polling System</h1>
                </header>
                <div className="content">
                    <div className="key-generation">
                        <button onClick={this.generateKeyPair}>Generate Key Pair</button>
                        {this.state.keys ? keysDiv : ""}
                    </div>

                    <div className="calendar">
                        <Calendar
                                value={this.getAvailableAppointments()}
                                minDate={moment().toDate()}
                                onChange={this.onSelectDate}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
