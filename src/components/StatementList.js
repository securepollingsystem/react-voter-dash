import React, { Component } from 'react';
import Modal from 'react-modal';

import {bindActionCreators} from 'redux';  
import * as actions from '../actions';

import {connect} from 'react-redux';  

import StatementAcceptConfirm from "./StatementAcceptConfirm";

import "./StatementList.css";

import faker from "faker";
function createStatement() {
    return {
        id: faker.random.uuid(),
        title: faker.company.bs(),
        description: faker.lorem.paragraphs(4),
        numVotes: faker.random.number()
    };
}


class StatementList extends Component {

    constructor(props) {
        super(props);


        var numStatements = 20;
        this.state = {
            //keys: keys
            statements: Array(numStatements).fill(null).map(function() {
                return createStatement();
            }),
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    openModal(statement) {
        console.log("openModal()");
        this.setState(previousState => {
            var nextState = previousState;
            nextState.modalIsOpen = true;
            nextState.selectedStatement = statement;
            return nextState;
        })
    }

    closeModal() {
        console.log("closeModal()");
        this.setState(previousState => {
            var nextState = previousState;
            nextState.modalIsOpen = false;
            return nextState;
        })
    }

    render() {

        var statementList = (
            <table className="statement-list">
                <thead><tr>
                    <th>
                        Statement
                    </th>
                    <th>
                        Number of Votes
                    </th>
                </tr></thead>
                <tbody>{
                    this.state.statements.map(statement => {
                        return (
                            <tr id={statement.id} onClick={() => this.openModal(statement)} className="statement">
                                <td className="title">
                                    {statement.title}
                                </td>
                                <td className="num-votes">
                                    {statement.numVotes}
                                </td>
                            </tr>
                        );
                    })
                }</tbody>
            </table>
        );

        return (
            <div className="StatementList">
                {statementList}
                <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                >
                    <StatementAcceptConfirm
                            statement={this.state.selectedStatement} 
                            onAdd={() => {}}
                            onClose={this.closeModal}
                    />
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(StatementList);

