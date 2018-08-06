import React from "react";
import io from "socket.io-client";
import MessageForm from "./messages/MessageForm";
import MessagesContainer from "./messages/MessagesContainer";
import Settings from "./settings/Settings";
import ResetDefault from "./settings/ResetDefault";
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions';

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.socket = io('localhost:5000');

        this.state = {
            socketId: null,
            currentTab: 'chat',
            timeoutId: null,
            titleVisibility: 'visible',
            pendingMessages: 0
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
         * Appends new message to the messages array in the state
         * @param {object} data The new message to append to the messages array
         */
        const addMessage = data => {
            this.props.onMessageAdded(data);
        };

        /**
         * Handler function to send messsages in the application using socket.io 
         * @param {object} data The new message to append to the messages array
         */
        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                id: Date.now()+Math.random(),
                author: this.props.username,
                message: this.props.message,
                date24: this.getFormattedTime(true,new Date()),
                date12: this.getFormattedTime(false,new Date()),
                socketId: this.state.socketId
            })
            this.props.onMessageChanged('');
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

    render(){
        return (
            <div id="top-container" className={"container-fluid bg-"+(this.props.settings.color)} style={{height:'100%'}} >
                <div className="main-chat container">
                    <div className="row header">
                        <ul className="nav nav-tabs">
                            <li className={"nav-item bg-"+(this.props.settings.color)}>
                                <a 
                                    href="#" 
                                    onClick={this.openChat} 
                                    className={"nav-link "
                                        +(this.state.currentTab==='chat'?'active':'')
                                        +(this.props.settings.color==='light'?'text-dark':'text-light')
                                    } 
                                    style={{visibility:this.state.titleVisibility}}>
                                    Chat                                    
                                    <sup style={{color:'red'}}>{this.state.pendingMessages===0?'':this.state.pendingMessages}</sup>
                                </a>
                            </li>
                            <li className={"nav-item bg-"+(this.props.settings.color)}>
                                <a 
                                    href="#" 
                                    onClick={this.openSettings} 
                                    className={"nav-link "
                                        +(this.state.currentTab==='settings'?'active':'')
                                        +(this.props.settings.color==='light'?'text-dark':'text-light')
                                    }>
                                    Settings</a>
                            </li>
                        </ul>
                    </div>
                    <div className="row content">
                        {this.state.currentTab==='chat'?
                            <MessagesContainer
                                socketId={this.state.socketId}/>
                        :
                            <Settings/>
                        }
                    </div>
                    <div className="row footer">
                        {this.state.currentTab==='chat'?
                            <MessageForm handleSendMessage={this.sendMessage}/>
                        :
                            <ResetDefault/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        message: state.message,
        username: state.username,
        settings: state.settings
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onMessageAdded: (data) => dispatch({type:actionTypes.ADD_MESSAGE, data }),
        onMessageChanged: (message) => dispatch({type:actionTypes.SET_CURRENT_MESSAGE, message })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);