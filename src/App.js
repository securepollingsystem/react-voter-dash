import React, { Component } from 'react';

import './App.css';

import AppointmentSelector from "./AppointmentSelector";

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
                    <textarea readOnly className="key" value={publicKey}></textarea>
                </div>
                <div className="private-key">
                    <div>Private:</div>
                    <textarea readOnly className="key" value={privateKey}></textarea>
                </div>
            </div>
        );

        return (
            <div className="App">
                <header>
                    <h2>Secure Polling System</h2>
                    <h1>Voter Registration</h1>
                </header>
                <div className="content">
                    <button onClick={this.clearKeys}>Clear Keys</button>
                    <div className="keys-div">
                        {this.state.keys ? keysDiv : ""}
                    </div>
                    <div>
                        {this.state.blindedPublicKey}
                    </div>
                    <AppointmentSelector />
                </div>
            </div>
        );
    }
}

export default App;
