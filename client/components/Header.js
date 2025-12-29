import React, {Component} from 'react';
import { Link, hashHistory }  from 'react-router'
import currentUser from '../queries/currentUser';
import { graphql, compose }from 'react-apollo';
import logout from '../queries/logout';
import { showSnackbar } from './emitter';

class Header extends Component {
    logoutCurrentUser() {
        this.props.mutate({
            refetchQueries: [{ query: currentUser}]
        }).then( () => {
            showSnackbar("Logout successful!");
            }
        );
    }
    renderButtons() {
        if (this.props.data.loading) {
            return <div> LOADING </div>
        }
        if (this.props.data.currentUser) {
            return (
                 <ul className="right">
                   <li><a onClick={() => this.logoutCurrentUser()}>Logout</a></li>
                 </ul>
            )
    }

    return (
        <ul className="right">
           <li><Link to="/login" >Login</Link></li>
           <li><Link to="/signup" >Signup</Link></li>
       </ul>
    )
    }
    render() {
        return (
        <div className="row">
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo left">Bump!</a>
                    {this.renderButtons()}
                  </div>
            </nav>
        </div>
        )
    }
}


export default graphql(logout)(graphql(currentUser)(Header));