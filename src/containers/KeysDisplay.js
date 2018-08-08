import React from 'react';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as actions from '../actions';
console.log("actions", actions);

class KeysDisplay extends React.Component {  

    render() {
        console.log("KeysDisplay.render()", this.state, this.props);

        var publicKey = this.props.keys.public;
        var privateKey = this.props.keys.private;

        console.log("publicKey", publicKey);
        console.log("privateKey", privateKey);

        return (
            <div className="keys-div">
                <div className="keys">
                    <div className="public-key">
                        <div>Public:</div>
                        <textarea readOnly className="key" value={publicKey || ""}></textarea>
                    </div>
                    <div className="private-key">
                        <div>Private:</div>
                        <textarea readOnly className="key" value={privateKey || ""}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {  
    console.log("KeysDisplay mapStateToProps()", state, ownProps);
    return {keys: state.keys}
}

function mapDispatchToProps(dispatch) {  
    console.log("KeysDiplay mapDispatchToProps()", dispatch);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KeysDisplay);
