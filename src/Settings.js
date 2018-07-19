import React, { Component } from 'react';

class Settings extends Component {
    constructor(props){
        super(props);
    }

    
  render() {
    return (
        <div className="col-12">
            <div className="form-group">
                <label 
                    htmlFor="username"
                    className={this.props.settings.color=='light'?'text-dark':'text-light'}
                >Username</label>
                <input type="text" className="form-control" id="username" value={this.props.username} onChange={this.props.handleUsernameChange}/>
            </div>
            <div className="form-group">
                <label class={this.props.settings.color=='light'?'text-dark':'text-light'}>Interface Color</label>
            </div>
            <div className="form-group row col-4" style={{marginLeft:'5px'}}>
                <div className="col form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="radioLight" value="light" checked={this.props.settings.color=== 'light'}  onChange={this.props.handleColorChange} />
                    <label className={"form-check-label " + (this.props.settings.color=='light'?'text-dark':'text-light')} htmlFor="radioLight">Light</label>
                </div>
                <div className="col form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="radioDark" value="dark" checked={this.props.settings.color=== 'dark'}  onChange={this.props.handleColorChange} />
                    <label className={"form-check-label " + (this.props.settings.color=='light'?'text-dark':'text-light')}  htmlFor="radioDark">Dark</label>
                </div>
            </div>
            <div className="form-group">
                <label class={this.props.settings.color=='light'?'text-dark':'text-light'}>Clock Display</label>
            </div>
            <div className="form-group row col-4" style={{marginLeft:'5px'}}>
                <div className="col form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="radio12H" value="12" checked={this.props.settings.clock24 === false}  onChange={this.props.handleClockChange} />
                    <label className={"form-check-label " + (this.props.settings.color=='light'?'text-dark':'text-light')}  htmlFor="radio12H">12 Hours</label>
                </div>
                <div className="col form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="radio24H" value="24" checked={this.props.settings.clock24 === true}  onChange={this.props.handleClockChange} />
                    <label className={"form-check-label " + (this.props.settings.color=='light'?'text-dark':'text-light')}  htmlFor="radio24H">24 Hours</label>
                </div>
            </div>
            <div className="form-group">
                <label class={this.props.settings.color=='light'?'text-dark':'text-light'}>Send Messages with Enter</label>
            </div>
            <div className="form-group row col-4" style={{marginLeft:'5px'}}>
                <div className="col form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="radioOn" value="on" checked={this.props.settings.onenter}  onChange={this.props.handleOnEnterChange} />
                    <label className={"form-check-label " + (this.props.settings.color=='light'?'text-dark':'text-light')}  htmlFor="radioOn">On</label>
                </div>
                <div className="col form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="radioOff" value="off" checked={!this.props.settings.onenter}  onChange={this.props.handleOnEnterChange} />
                    <label className={"form-check-label " + (this.props.settings.color=='light'?'text-dark':'text-light')}  htmlFor="radioOff">Off</label>
                </div>
            </div>
        </div>
    );
  }
}

export default Settings;
