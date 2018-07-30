import React from "react";
import io from "socket.io-client";
import MessageForm from "./MessageForm";
import Settings from "./Settings";
import MessagesContainer from "./MessagesContainer";
import ResetDefault from "./ResetDefault";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.socket = io('192.168.2.101:5000');

        this.state = {
            socketId: null,
            username: 'guest0001',
            message: '',
            messages: [],
            currentTab: 'chat',
            timeoutId: null,
            titleVisibility: 'visible',
            pendingMessages: 0,
            settings:{
                color: 'light',
                clock24: true,
                ctrlenter: false,
                onenter: true,
            }
        };

        /**
         * The socketId is saved inside of the state once we are connected to the application
         */
        this.socket.on('connect', ()=>{
            this.setState({socketId: this.socket.id});
        });
        
        /**
         * Listener function to trigger messages' changes in the state
         * @param {object} data The new messages array from the application
         */
        this.socket.on('RECEIVE_MESSAGE', (data)=> {
            addMessage(data);
            if(this.state.currentTab!=='chat'){
                if(!this.state.timeoutId){
                    this.setState({                    
                        timeoutId: setInterval(this.blink, 500)
                    });
                }   
                let pending = this.state.pendingMessages;
                this.setState({
                    pendingMessages: pending+1,
                });
            }            
        });
        
        /**
         * Appends new message to the messages array
         * @param {object} data The new message to append to the messages array
         */
        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        /**
         * Handler function to send messsages in the application using socket.io 
         * @param {object} data The new message to append to the messages array
         */
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

    /**
     * Simulates a blinking animation on the Navbar specifically in the element 'Chat' to gain user's attention
     */
    blink = () => { 
        let title = this.state.titleVisibility;
        if(title==='hidden'){
            this.setState({titleVisibility: 'visible'});
        }else{
            this.setState({titleVisibility: 'hidden'});
        }
    }

    /**
     * Opens the chat when the user clicks on the element 'Chat' in the Navbar;
     */
    openChat = ()=>{
        clearInterval(this.state.timeoutId);
        this.setState({pendingMessages:0,currentTab: 'chat',timeoutId: null, titleVisibility: 'Chat'});
    }

    /**
     * Opens the settings when the user clicks on the element 'Settings' in the Navbar;
     */
    openSettings = ()=>{
        this.setState({currentTab: 'settings'});
    }

    /**
     * Resets all the settings to their default values in the state
     */
    resetDefault = ()=>{
        this.setState({
            username: 'guest0001',            
            settings: {
                color: 'light',
                clock24: true,
                ctrlenter: false,
                onenter: true,
            }
        });
    }

    /**
     * Helper function to get a customized string from the time passed as an attribute
     * @param {boolean} format24 Desired format for the time 24H / 12H
     * @param {Date} date The Date object
     * @returns {string} 
     */
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

    /**
     * Handler function to trigger color-selection changes in the state
     */
    handleColorChange = (e)=> {
        let settings  = this.state.settings;
        settings.color = e.target.value;
        this.setState({
            settings
        });
    }

    /**
     * Handler function to trigger time-format changes in the state
     */
    handleClockChange = (e)=> {
        const result=  e.target.value=== '24';
        
        let settings  = this.state.settings;
        settings.clock24 = result;
        this.setState({
            settings
        });
    }

    /**
     * Handler function to trigger send-on-enter-preference changes in the state
     */
    handleOnEnterChange = (e)=> {
        const result=  e.target.value=== 'on';
        
        let settings  = this.state.settings;
        settings.onenter = result;
        this.setState({
            settings
        });
    }

    /**
     * Handler function to enforce the send-on-enter preference 
     */
    handleMessageKeyPress = (e) => {
        if(e.key == 'Enter' && !this.state.settings.onenter){
          e.preventDefault();
        }
    }

    /**
     * Handler function to trigger message changes in the state
     */
    handleMessageChange = (e) => {
        this.setState({message: e.target.value})
    }

    /**
     * Handler function to trigger username changes in the state
     */
    handleUsernameChange = (e) => {
        this.setState({username: e.target.value})
    }

    render(){
        return (
            <div id="top-container" className={"container-fluid bg-"+(this.state.settings.color)} style={{height:'100%'}} >
                <div className="main-chat container">
                    <div className="row header">
                        <ul className="nav nav-tabs">
                            <li className={"nav-item bg-"+(this.state.settings.color)}>
                                <a 
                                    href="#" 
                                    onClick={this.openChat} 
                                    className={"nav-link "
                                        +(this.state.currentTab=='chat'?'active':'')
                                        +(this.state.settings.color=='light'?'text-dark':'text-light')
                                    } 
                                    style={{visibility:this.state.titleVisibility}}>
                                    Chat                                    
                                    <sup style={{color:'red'}}>{this.state.pendingMessages==0?'':this.state.pendingMessages}</sup>
                                </a>
                            </li>
                            <li className={"nav-item bg-"+(this.state.settings.color)}>
                                <a 
                                    href="#" 
                                    onClick={this.openSettings} 
                                    className={"nav-link "
                                        +(this.state.currentTab=='settings'?'active':'')
                                        +(this.state.settings.color=='light'?'text-dark':'text-light')
                                    }>
                                    Settings</a>
                            </li>
                        </ul>
                    </div>
                    <div className="row content">
                        {this.state.currentTab=='chat'?
                            <MessagesContainer 
                                messages={this.state.messages} 
                                socketId={this.state.socketId} 
                                settings={this.state.settings}/>
                        :
                            <Settings 
                                username={this.state.username} 
                                settings={this.state.settings} 
                                handleUsernameChange={this.handleUsernameChange} 
                                handleOnEnterChange={this.handleOnEnterChange} 
                                handleClockChange={this.handleClockChange} 
                                handleColorChange={this.handleColorChange}/>
                        }
                    </div>
                    <div className="row footer">
                        {this.state.currentTab=='chat'?
                            <MessageForm 
                                message={this.state.message}  
                                handleMessageChange={this.handleMessageChange} 
                                handleMessageKeyPress={this.handleMessageKeyPress} 
                                handleSendMessage={this.sendMessage}/>
                        :
                            <ResetDefault
                                handleResetDefault={this.resetDefault}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;