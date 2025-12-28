
import React, { Component } from 'react';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }

    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit({ email: this.state.email, password: this.state.password });

    }
    render() {
    return (
     <div className="row">
        <form className="col s6" onSubmit={this.onSubmit.bind(this)} id="loginForm">
        <h3 >{this.props.title}</h3>
            <input placeholder="Email" value={this.state.email} onChange={(event) => this.setState({email: event.target.value}) }/>
            <input placeholder="Password" type="password" onChange={(event) => this.setState({password: event.target.value}) }/>
            <button type="submit" className="btn" >
                <i className="small material-icons">airline_seat_flat</i>
             </button>
        </form>

       </div>
       )
    }
}


export default Authentication;