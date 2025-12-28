import React, { Component } from 'react';
import query from '../queries/currentUser';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps) {
            if (!nextProps.data.currentUser && !nextProps.data.loading) {
                hashHistory.push("/login");
            }
        }
        render () {
            return <WrappedComponent {...this.props} />
        }
    }
    return graphql(query)(RequireAuth);
}
