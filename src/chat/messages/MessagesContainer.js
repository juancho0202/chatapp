import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessagesContainer extends Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate = function() {
        var elem = document.getElementById('endOfMessages');         
        elem.scrollIntoView();
    };
    
    render() {
        return (
            <div className="col-12 d-flex align-items-end" style={{overflow: 'hidden'}}>
                <div className="messages">
                    {
                        this.props.messages.map((message) => {
                            return (
                                <div 
                                    key={message.id} 
                                    className={
                                        (message.socketId===this.props.socketId?'ownMessage':'otherGuysMessage')
                                    }>
                                    <div className={
                                        'chat-message-bubble '
                                        +(message.socketId===this.props.socketId?'ownMsg':'otherGuysMsg')
                                    }>
                                        {message.socketId!==this.props.socketId?message.author+':' :''} {message.message} - {this.props.settings.clock24?message.date24:message.date12}
                                    </div>                                
                                </div>
                            )
                        })
                    }
                    <div id="endOfMessages"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.username,
        settings: state.settings,
        messages: state.messages
    };
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);