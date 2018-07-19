import React, { Component } from 'react';

class ResetDefault extends Component {
    constructor(props){
        super(props);
    }

    
  render() {
    return (
        <form className="form-row" style={{width: '100%'}}>
            <div className="mb-4 col-md-12 text-center">
                <button className="btn btn-primary" onClick={this.props.handleResetDefault}>Reset Default Values</button>
            </div>
        </form>
    );
  }
}

export default ResetDefault;
