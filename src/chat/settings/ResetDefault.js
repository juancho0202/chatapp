import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';

class ResetDefault extends Component {
    constructor(props){
        super(props);
    }

    /**
     * Resets all the settings to their default values in the state
     */
    resetDefault = ()=>{
        this.props.onResetDefault();
    }

    
    render() {
        return (
            <form className="form-row" style={{width: '100%'}}>
                <div className="mb-4 col-md-12 text-center">
                    <button className="btn btn-primary" onClick={this.resetDefault}>Reset Default Values</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onResetDefault: () => dispatch({type:actionTypes.RESET_DEFAULT})        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetDefault);