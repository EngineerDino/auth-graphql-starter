import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import SongList from './SongList';

class Dashboard extends Component {

    render() {
            return (
        <SongList />
        )
    }
}

export default Dashboard;