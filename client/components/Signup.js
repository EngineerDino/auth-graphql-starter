import React, { Component } from 'react';
import Authentication from './Authentication';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import mutation from '../queries/signup';
import currentUser from '../queries/currentUser';
import { showSnackbar } from './emitter';


class Signup extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.data.currentUser) {
            hashHistory.push("/dashboard");
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query: currentUser }]
        }).then(() => {
                showSnackbar("Signup successful!");
            });
        }

    render() {
        return (
            <Authentication title="Signup" onSubmit={this.onSubmit.bind(this)}/>
        )
    }
}

export default graphql(currentUser)(graphql(mutation)(Signup));