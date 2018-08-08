import React, { Component } from 'react';

import './App.css';

import AppointmentSelector from "./AppointmentSelector";
import KeysDisplay from "../containers/KeysDisplay";

import {connect} from 'react-redux';  

import {createRSAKeys, PublicKeyBlinder, fetchTimeSlots, bookAppointment} from "../utils";

import {bindActionCreators} from 'redux';  
import * as actions from '../actions';

import moment from "moment";
import JSEncrypt from "jsencrypt";

window.moment = moment;
window.JSEncrypt = JSEncrypt;


//let DEFAULT_KEY_SIZE=2048;
let LOCAL_STORAGE_KEY="SPSRsaKeys";


class App extends Component {

    constructor(props) {
        super(props);

        var keys;
        if (!this.props.keys.public || !this.props.keys.private) {
            console.log("NO KEYS FOUND");
            keys = createRSAKeys();
            this.props.setKeys(keys);
        }
        //var keys = getOrCreateRSAKeys();
        console.log("GOT OR CREATED KEYS", keys);


        this.state = {
            //keys: keys
        };

        //this.generateKeys = this.generateKeys.bind(this);
        //this.blindPublicKey = this.blindPublicKey.bind(this);

        this.clearKeys = this.clearKeys.bind(this);


    }

    clearKeys() {
        console.log("clearKeys()");
        this.props.removeKeys();
        //localStorage.removeItem(LOCAL_STORAGE_KEY);
        //this.setState(previousState => {
        //    var newState = previousState;
        //    delete newState.keys;
        //    return newState;
        //})
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

        //var publicKey = (this.state.keys || {}).public;
        //var privateKey = (this.state.keys || {}).private;
        //var keysDiv = (
        //    <div className="keys">
        //        <div className="public-key">
        //            <div>Public:</div>
        //            <textarea readOnly className="key" value={publicKey}></textarea>
        //        </div>
        //        <div className="private-key">
        //            <div>Private:</div>
        //            <textarea readOnly className="key" value={privateKey}></textarea>
        //        </div>
        //    </div>
        //);

        console.log("STORE", require("../redux-store").default.getState());

        console.log("KEYS DISPLAY", KeysDisplay);
        console.log("APP PROPS", this.props);
        return (
            <div className="App">
                <header>
                    <h2>Secure Polling System</h2>
                    <h1>Voter Registration</h1>
                </header>
                <div className="content">
                    <KeysDisplay />
                    <button onClick={this.clearKeys}>Clear Keys</button>
                    <div>
                        {this.state.blindedPublicKey}
                    </div>
                    <AppointmentSelector />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {  
    console.log("App mapStateToProps()", state, ownProps);
    return {keys: state.keys};
}

function mapDispatchToProps(dispatch) {  
    console.log("mapDispatchToProps()", dispatch);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
