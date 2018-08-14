import React, { Component } from 'react';
import { DropdownButton, MenuItem } from "react-bootstrap";

import {connect} from 'react-redux';  

import {bindActionCreators} from 'redux';  
import * as actions from '../actions';

import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }


    render() {

        console.log("HEADER PROPS", this.props);
        return (
            <header className="Header">
                <h2>Secure Polling System</h2>
                <h1>Voter Dashboard</h1>
                <DropdownButton title={"Hello" + (this.props.name ? ", "+this.props.name : "")} pullRight>
                    <MenuItem onSelect={this.props.removeKeys} eventKey="1">Reset Keys</MenuItem>
                    <MenuItem onSelect={this.props.removeBooking} eventKey="2">Reset Booking</MenuItem>
                </DropdownButton>
            </header>
        );
    }
}


function mapStateToProps(state, ownProps) {  
    return {keys: state.keys, booking: state.bookings.booking};
}

function mapDispatchToProps(dispatch) {  
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
