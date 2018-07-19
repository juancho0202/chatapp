import React from "react";
import io from "socket.io-client";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.socket = io('localhost:5000');

        this.state = {
            socketId: null,
            username: 'guest0001',
            message: '',
            messages: [],
            currentTab: 'chat',
            timeoutId: null,
            titleVisibility: 'visible',
            settings:{
                color: 'light',
                clock24: true,
                ctrlenter: false,
                onenter: true,
            }
        };

        this.socket.on('connect', ()=>{
            this.setState({socketId: this.socket.id});
        });

        this.socket.on('RECEIVE_MESSAGE', (data)=> {
            addMessage(data);
            if(this.state.currentTab!=='chat'){
                this.setState({
                    timeoutId: setInterval(this.blink, 500)
                })
            }
        });

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});            
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message,
                date24: this.getFormattedTime(true,new Date()),
                date12: this.getFormattedTime(false,new Date()),
                socketId: this.state.socketId
            })
            this.setState({message: ''});

        }

        
    }

    blink = () => { 
        let title = this.state.titleVisibility;
        if(title==='hidden'){
            this.setState({titleVisibility: 'visible'});
        }else{
            this.setState({titleVisibility: 'hidden'});
        }
    }

    openChat = ()=>{
        clearInterval(this.state.timeoutId);
        this.setState({currentTab: 'chat',timeoutId: null, titleVisibility: 'Chat'});
    }

    openSettings = ()=>{
        this.setState({currentTab: 'settings'});
    }

    getFormattedTime = (format24, date) =>{
        if (format24){
            const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            return hours + ":" + minutes ;
        }else{
            let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
            const am_pm = date.getHours() >= 12 ? "PM" : "AM";
            hours = hours < 10 ? "0" + hours : hours;
            const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            return hours + ":" + minutes + " " + am_pm;
        }
    }

    
    handleColorChange = (changeEvent)=> {
        let settings  = this.state.settings;
        settings.color = changeEvent.target.value;
        this.setState({
            settings
        });
    }

    handleClockChange = (changeEvent)=> {
        const result=  changeEvent.target.value=== '24';
        
        let settings  = this.state.settings;
        settings.clock24 = result;
        this.setState({
            settings
        });
    }

    handleOnEnterChange = (changeEvent)=> {
        const result=  changeEvent.target.value=== 'on';
        
        let settings  = this.state.settings;
        settings.onenter = result;
        this.setState({
            settings
        });
    }

    handleKeyPress = (event) => {
        if(event.key == 'Enter' && !this.state.settings.onenter){
          event.preventDefault();
        }
    }

    render(){

        const messagesContainer = <div className="col-12 d-flex align-items-end">
                                    <div className="messages">
                                        {this.state.messages.map(message => {
                                            return (
                                                <div className={message.socketId===this.state.socketId?'ownMessage':'otherGuysMessage'}>{message.socketId!==this.state.socketId?message.author+':' :''} {message.message} - {this.state.settings.clock24?message.date24:message.date12}</div>
                                            )
                                        })}
                                    </div>
                                </div>;

        const settingsContainer = <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Interface Color</label>
                                    </div>
                                    <div className="form-group row col-4" style={{marginLeft:'5px'}}>
                                        <div className="col form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="radioLight" value="light" checked={this.state.settings.color=== 'light'}  onChange={this.handleColorChange} />
                                            <label className="form-check-label" htmlFor="radioLight">Light</label>
                                        </div>
                                        <div className="col form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="radioDark" value="dark" checked={this.state.settings.color=== 'dark'}  onChange={this.handleColorChange} />
                                            <label className="form-check-label" htmlFor="radioDark">Dark</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Clock Display</label>
                                    </div>
                                    <div className="form-group row col-4" style={{marginLeft:'5px'}}>
                                        <div className="col form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="radio12H" value="12" checked={this.state.settings.clock24 === false}  onChange={this.handleClockChange} />
                                            <label className="form-check-label" htmlFor="radio12H">12 Hours</label>
                                        </div>
                                        <div className="col form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="radio24H" value="24" checked={this.state.settings.clock24 === true}  onChange={this.handleClockChange} />
                                            <label className="form-check-label" htmlFor="radio24H">24 Hours</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Send Messages with Enter</label>
                                    </div>
                                    <div className="form-group row col-4" style={{marginLeft:'5px'}}>
                                        <div className="col form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="radioOn" value="on" checked={this.state.settings.onenter}  onChange={this.handleOnEnterChange} />
                                            <label className="form-check-label" htmlFor="radioOn">On</label>
                                        </div>
                                        <div className="col form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="radioOff" value="off" checked={!this.state.settings.onenter}  onChange={this.handleOnEnterChange} />
                                            <label className="form-check-label" htmlFor="radioOff">Off</label>
                                        </div>
                                    </div>
                                </div>;
        const messageForm = <form className="form-row" style={{width: '100%'}}>
                                <div className="form-group mb-2 col-9" style={{paddingLeft: '15px'}}>
                                    <input type="text" className="form-control" placeholder="Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} onKeyPress={this.handleKeyPress}/>
                                </div>
                                <div className="col mb-2">
                                    <button className="btn btn-primary" onClick={this.sendMessage}>Send</button>
                                </div>
                            </form>;

        return (
            <div className="main-chat container">
                <div className="row header">
                    <ul className="nav nav-tabs">
                        <li className="nav-item"><a href="#" onClick={this.openChat} className={"nav-link "+(this.state.currentTab=='chat'?'active':'')} style={{visibility:this.state.titleVisibility}}>Chat</a></li>
                        <li className="nav-item"><a href="#" onClick={this.openSettings} className={"nav-link "+(this.state.currentTab=='settings'?'active':'')}>Settings</a></li>
                    </ul>
                </div>
                <div className="row content">
                    {this.state.currentTab=='chat'?messagesContainer:settingsContainer}
                </div>
                <div className="row footer">
                    {this.state.currentTab=='chat'?messageForm:<div></div>}
                </div>
            </div>
        );
    }
}

export default Chat;