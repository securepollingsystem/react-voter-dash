import React, { Component } from 'react';

import './App.css';

import AppointmentSelectionWidget from "../containers/AppointmentSelectionWidget";
import Header from "./Header";
//import KeysDisplay from "../containers/KeysDisplay";

import {connect} from 'react-redux';  


import {bindActionCreators} from 'redux';  
import * as actions from '../actions';

import moment from "moment";
import JSEncrypt from "jsencrypt";

window.moment = moment;
window.JSEncrypt = JSEncrypt;
window.bluebird = require("bluebird");
window.faker = require("faker");


class App extends Component {

    constructor(props) {
        super(props);


        this.state = {
            //keys: keys
        };

        //this.generateKeys = this.generateKeys.bind(this);
        //this.blindPublicKey = this.blindPublicKey.bind(this);

    }

    componentDidMount() {

        //var keys;
        //if (!this.props.keys.public || !this.props.keys.private) {
        //    console.log("NO KEYS FOUND");
        //    keys = createRSAKeys();
        //    this.props.setKeys(keys);
        //}
        ////var keys = getOrCreateRSAKeys();
        //console.log("GOT OR CREATED KEYS", keys);
        
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

        var view;

        view = (
            <div>
                <h2>Registration</h2>
                <AppointmentSelectionWidget />
            </div>
        );

        if (this.props.keys.publicSigned) {
            view = (
                <div>
                    <h3>Registration Complete.</h3>
                    <button onClick={() => {this.props.removeKeys();this.props.removeBooking();}}>Reset</button>
                </div>
            );
        }

        console.log("App props", this.props);
        return (
            <div className="App">
                <Header name={this.props.booking && this.props.booking.personalId.firstName} />
                <div className="content">
                    {/*<KeysDisplay />*/}
                    <div>
                        {this.state.blindedPublicKey}
                    </div>
                    {view}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {  
    console.log("App mapStateToProps()", state, ownProps);
    return {keys: state.keys, booking: state.bookings.booking};
}

function mapDispatchToProps(dispatch) {  
    console.log("mapDispatchToProps()", dispatch);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
