import React, { Component } from 'react';

import "./StatementAcceptConfirm.css";


import faker from "faker";


class StatementAcceptConfirm extends Component {

    constructor(props) {
        super(props);

        this.add = this.add.bind(this);
        this.close = this.close.bind(this);
    }

    add() {
        this.props.onAdd();
    }

    close() {
        this.props.onClose();
    }

    render() {

        return (
            <div className="StatementAcceptConfirm">
                <div style={{position: "relative", top: "30%"}}>
                    <div>Do you want to add this statement to your screed?</div>
                    <div>
                        <button onClick={this.add} >Add</button>
                        <button onClick={this.close} >Cancel</button>
                    </div>
                    <div>{this.props.statement.title}</div>
                </div>
                <div className="close-button" onClick={this.close} >X</div>
            </div>
        );
    }
}
export default StatementAcceptConfirm;

