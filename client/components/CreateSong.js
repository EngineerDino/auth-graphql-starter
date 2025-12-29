//we need to define a mutation
//we need the title
//we need a form

import gql from 'graphql-tag'
import React, {Component } from 'react'
import {Link , hashHistory} from 'react-router'
import {graphql} from 'react-apollo'
import query from '../queries/fetchSongs';
import LinkButton from './LinkButton'
import { showSnackbar } from './emitter';


class CreateSong extends Component {
    constructor(props) {
        super(props);
        this.state = {title:''}
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
           refetchQueries: [{query}]
        }).then(() => {
        hashHistory.push('/dashboard');
        showSnackbar("New Song added!");
        });
    }

    render() {
        return (
        <div className="row">
                <LinkButton to="/dashboard" classNames="purple lighten-4 back-link" iconName="arrow_back"/>
         <h3>Create a Song</h3>
         <form onSubmit={this.onSubmit.bind(this)} id="createSongForm">
            <label>Song Title: </label>
            <input
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}/>
         </form>
         <button className="btn-large purple lighten-4 waves-effect" type="submit" form="createSongForm" value="Submit">Create
             <i className="material-icons right">airline_seat_flat_angled
             </i>
           </button>

         </div>
        );

    }
}

const addSongMutation = gql`
mutation createASong($title: String) {
    addSong(title: $title) {
        title, id
    }
}
`

export default graphql(addSongMutation)(CreateSong);