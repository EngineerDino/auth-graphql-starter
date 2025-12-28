import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Authentication from './Authentication';
import login from '../queries/login';
import { graphql } from 'react-apollo'
import currentUser from '../queries/currentUser'
import { showSnackbar } from './emitter';

class Login extends Component {
    constructor(props) {
        super(props);
    }
    componentWillUpdate(nextProps) {
        if (nextProps.data.currentUser) {
            hashHistory.push("/dashboard");
        }
    }
    fetchErrorMessage(error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            return error.graphQLErrors[0].message;
        }
        if (error.networkError) {
            return "Network error!";
        }

        return "Something went wrong!"
    }
    onSubmit({email, password}) {
        this.props.mutate({
            variables: {
                email, password
            },
            refetchQueries: [{ query: currentUser }]
        }).then(() => showSnackbar("Login successful!"))
            .catch((error) => {
            console.log(error.graphQLErrors);
            showSnackbar(this.fetchErrorMessage(error), "error")
        });
     }
    render() {
        return <Authentication onSubmit={this.onSubmit.bind(this) } title="Login" />
    }
}

export default graphql(currentUser)(graphql(login)(Login));