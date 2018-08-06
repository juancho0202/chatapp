import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

class Settings extends Component {
    constructor(props){
        super(props);
    }
    
    /**
     * Handler function to trigger color-selection changes in the state
     */
    handleColorChange = (e)=> {
        const color = e.target.value;
        this.props.onColorChanged(color);
    }

    /**
     * Handler function to trigger time-format changes in the state
     */
    handleClockChange = (e)=> {
        const clock24=  e.target.value=== '24';
        this.props.onTimeFormatChanged(clock24);
    }

    /**
     * Handler function to trigger send-on-enter-preference changes in the state
     */
    handleOnEnterChange = (e)=> {
        const onenter=  e.target.value=== 'on';
        this.props.onOnEnterChanged(onenter);
    }

    
    /**
     * Handler function to trigger username changes in the state
     */
    handleUsernameChange = (e) => {
        const username = e.target.value;
        this.props.onUsernameChanged(username);
    }
    
    render() {
        return (
            <div className="col-12">
                <div className="form-group">
                    <label 
                        htmlFor="username"
                        className={this.props.settings.color==='light'?'text-dark':'text-light'}
                    >Username</label>
                    <input type="text" className="form-control" id="username" value={this.props.username} onChange={this.handleUsernameChange}/>
                </div>
                <div className="form-group">
                    <label className={this.props.settings.color==='light'?'text-dark':'text-light'}>Interface Color</label>
                </div>
                <div className="form-group row col-8 col-md-4" style={{marginLeft:'5px'}}>
                    <div className="col form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="radioLight" value="light" checked={this.props.settings.color=== 'light'}  onChange={this.handleColorChange} />
                        <label className={"form-check-label " + (this.props.settings.color==='light'?'text-dark':'text-light')} htmlFor="radioLight">Light</label>
                    </div>
                    <div className="col form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="radioDark" value="dark" checked={this.props.settings.color=== 'dark'}  onChange={this.handleColorChange} />
                        <label className={"form-check-label " + (this.props.settings.color==='light'?'text-dark':'text-light')}  htmlFor="radioDark">Dark</label>
                    </div>
                </div>
                <div className="form-group">
                    <label className={this.props.settings.color==='light'?'text-dark':'text-light'}>Clock Display</label>
                </div>
                <div className="form-group row col-8 col-md-4" style={{marginLeft:'5px'}}>
                    <div className="col form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="radio12H" value="12" checked={this.props.settings.clock24 === false}  onChange={this.handleClockChange} />
                        <label className={"form-check-label " + (this.props.settings.color==='light'?'text-dark':'text-light')}  htmlFor="radio12H">12 Hours</label>
                    </div>
                    <div className="col form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="radio24H" value="24" checked={this.props.settings.clock24 === true}  onChange={this.handleClockChange} />
                        <label className={"form-check-label " + (this.props.settings.color==='light'?'text-dark':'text-light')}  htmlFor="radio24H">24 Hours</label>
                    </div>
                </div>
                <div className="form-group">
                    <label className={this.props.settings.color==='light'?'text-dark':'text-light'}>Send Messages with Enter</label>
                </div>
                <div className="form-group row col-8 col-md-4" style={{marginLeft:'5px'}}>
                    <div className="col form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="radioOn" value="on" checked={this.props.settings.onenter}  onChange={this.handleOnEnterChange} />
                        <label className={"form-check-label " + (this.props.settings.color==='light'?'text-dark':'text-light')}  htmlFor="radioOn">On</label>
                    </div>
                    <div className="col form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="radioOff" value="off" checked={!this.props.settings.onenter}  onChange={this.handleOnEnterChange} />
                        <label className={"form-check-label " + (this.props.settings.color==='light'?'text-dark':'text-light')}  htmlFor="radioOff">Off</label>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.username,
        settings: state.settings
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onColorChanged: (color) => dispatch({type:actionTypes.CHANGE_COLOR, color }),
        onTimeFormatChanged: (clock24) => dispatch({type:actionTypes.CHANGE_TIME_FORMAT, clock24 }),
        onOnEnterChanged: (onenter) => dispatch({type:actionTypes.CHANGE_ON_ENTER_PROP, onenter }),
        onUsernameChanged: (username) => dispatch({type:actionTypes.CHANGE_USERNAME, username })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
