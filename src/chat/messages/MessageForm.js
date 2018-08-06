import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

class MessageForm extends Component {
    constructor(props){
        super(props);
    }

    /**
     * Handler function to trigger message changes in the state
     */
    handleMessageChange = (e) => {
        const message = e.target.value;
        this.props.onMessageChanged(message);
    }    

    /**
     * Handler function to enforce the send-on-enter preference 
     */
    handleMessageKeyPress = (e) => {
        if(e.key === 'Enter' && !this.props.settings.onenter){
          e.preventDefault();
        }
    }

    
    render() {
        return (
            <form className="form-row" style={{width: '100%'}}>
                <div className="form-group mb-2 col-9 col-md-11" style={{paddingLeft: '15px'}}>
                    <input type="text" className="form-control" placeholder="Message" value={this.props.message} onChange={this.handleMessageChange} onKeyPress={this.handleMessageKeyPress}/>
                </div>
                <div className="col-3 col-md-1 mb-2" >
                    <button className="btn btn-primary col-12 " onClick={this.props.handleSendMessage}>Send</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        message: state.message,
        settings: state.settings
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onMessageChanged: (message) => dispatch({type:actionTypes.SET_CURRENT_MESSAGE, message }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
