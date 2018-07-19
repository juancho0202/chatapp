import React, { Component } from 'react';

class MessagesContainer extends Component {
    constructor(props){
        super(props);
    }

    
  render() {
    return (
        <div className="col-12 d-flex align-items-end">
            <div className="messages">
                {
                    this.props.messages.map((message) => {
                        return (
                            <div 
                                key="message" 
                                className={
                                    (this.props.settings.color=='light'?'text-dark ':'text-light') 
                                    +(message.socketId===this.props.socketId?'ownMessage':'otherGuysMessage')
                                }>
                                {message.socketId!==this.props.socketId?message.author+':' :''} {message.message} - {this.props.settings.clock24?message.date24:message.date12}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
  }
}

export default MessagesContainer;
