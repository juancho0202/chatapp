import React, { Component } from 'react';

class MessageForm extends Component {
    constructor(props){
        super(props);
    }

    
  render() {
    return (
        <form className="form-row" style={{width: '100%'}}>
            <div className="form-group mb-2 col-9" style={{paddingLeft: '15px'}}>
                <input type="text" className="form-control" placeholder="Message" value={this.props.message} onChange={this.props.handleMessageChange} onKeyPress={this.props.handleMessageKeyPress}/>
            </div>
            <div className="col mb-2">
                <button className="btn btn-primary" onClick={this.props.handleSendMessage}>Send</button>
            </div>
        </form>
    );
  }
}

export default MessageForm;
