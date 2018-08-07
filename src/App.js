import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Calendar from "react-calendar";

import {getOrCreateRSAKeys, PublicKeyBlinder, fetchTimeSlots, bookAppointment} from "./utils";

import moment from "moment";
import JSEncrypt from "jsencrypt";


window.moment = moment;
window.JSEncrypt = JSEncrypt;


//let DEFAULT_KEY_SIZE=2048;
let LOCAL_STORAGE_KEY="SPSRsaKeys";


class App extends Component {

    constructor(props) {
        super(props);

        var keys = getOrCreateRSAKeys();
        console.log("GOT OR CREATED KEYS", keys);


        this.state = {
            keys: keys
        };

        //this.generateKeys = this.generateKeys.bind(this);
        //this.blindPublicKey = this.blindPublicKey.bind(this);

        this.clearKeys = this.clearKeys.bind(this);


    }

    clearKeys() {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        this.setState(previousState => {
            var newState = previousState;
            delete newState.keys;
            return newState;
        })
    }

    //getOrCreateKeys() {
    //    var keys;
    //    keys = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //    if (keys) {
    //        console.log("FOUND KEYS IN LOCAL STORAGE");
    //    }
    //    if (!keys) {
    //        console.log("NO KEYS FOUND; CREATING SOME");
    //        var jsencrypt = new JSEncrypt({"default_key_size": DEFAULT_KEY_SIZE})
    //        keys = {
    //            public: jsencrypt.getPublicKey(),
    //            private: jsencrypt.getPrivateKey()
    //        };
    //        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(keys));
    //    }
    //    return keys;
    //}

    //generateKeys() {
    //    console.log("GENERATE KEY PAIR");
    //    var jsencrypt = new JSEncrypt({"default_key_size": DEFAULT_KEY_SIZE})
    //    var keys = {
    //        public: jsencrypt.getPublicKey(),
    //        private: jsencrypt.getPrivateKey()
    //    };
    //    console.log(jsencrypt);
    //    console.log(jsencrypt.key.e);
    //    console.log(jsencrypt.key.n);
    //    this.setState((previousState) => {
    //        var newState = previousState;
    //        newState.keys = keys;
    //        newState.jsencrypt = jsencrypt;
    //        return newState;
    //    })
    //    return keys;
    //}

    //blindPublicKey() {
    //    console.log("blindPublicKey()");
    //    var message = this.state.keys.public;
    //    var N = this.state.jsencrypt.key.n.toString();
    //    var E = this.state.jsencrypt.key.e.toString();
    //    const { blinded, r } = BlindSignature.blind({
    //        message: message,
    //        N: N,
    //        E: E
    //    });
    //    this.setState(previousState => {
    //        var newState = previousState;
    //        newState.blinded
    //        return newState;
    //    });
    //    //console.log("BLINDED", blinded);
    //    //console.log("r", r);
    //    //var unblinded = BlindSignature.unblind({
    //    //    signed: blinded,
    //    //    N: N,
    //    //    r: r
    //    //});
    //    //console.log("unblinded", unblinded);
    //}

    onSelectDate(date) {
        console.log("onSelectDate()", date);
    }

    ////API
    //getTimeSlots() {
    //    // [{date: YYYY-MM-DD, times: ["10:00", "14:00"]}
    //    return;
    //}
    //getAvailableAppointments() {
    //    var today = moment();
    //    var firstDayOfMonth = today.startOf("month");
    //    var daysInMonth = moment().daysInMonth();
    //    var numDates = Math.floor(Math.random() * (daysInMonth - 1)) + 1;
    //    var dates = Array(numDates).fill(null).map(function(e, i) {
    //            return Math.floor(Math.random() * daysInMonth - 1);
    //        })
    //    console.log("dates", dates);
    //    dates = dates.filter(function(dateNum, pos) {
    //            return dates.indexOf(dateNum) == pos;
    //        })
    //    dates = dates.map(function(dateNum) {
    //        return moment().startOf("month").add(dateNum, "days");
    //    })
    //    console.log("dates", dates);
    //    dates = dates.map(function(date) {return date.toDate();})
    //    //dates = dates.map(function(date) {return date.toLocaleString();})
    //    console.log("dates", dates);
    //    return [dates[0], dates[1]];
    //}

    //getTileClassName(date) {
    //    
    //}

    //scheduleAppointment() {
    //    
    //}

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
        // keep track of key version
    }


    render() {

        var publicKey = (this.state.keys || {}).public;
        var privateKey = (this.state.keys || {}).private;
        var keysDiv = (
            <div className="keys">
                <div className="public-key">
                    <div>Public:</div>
                    <textarea className="key">
                        {publicKey}
                    </textarea>
                </div>
                <div className="private-key">
                    <div>Private:</div>
                    <textarea readonly className="key">
                        {privateKey}
                    </textarea>
                </div>
            </div>
        );

        return (
            <div className="App">
                <header>
                    <h1>Secure Polling System</h1>
                </header>
                <div className="content">
                    <button onClick={this.clearKeys}>Clear Keys</button>
                    <div className="keys-div">
                        {this.state.keys ? keysDiv : ""}
                    </div>
                    <button onClick={this.blindPublicKey}>Blind Public Key</button>
                    <div>
                        {this.state.blindedPublicKey}
                    </div>
                    <div className="calendar">
                        <Calendar
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
