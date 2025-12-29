import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo'
import detailQuery from '../queries/songDetail'
import { showSnackbar } from './emitter';


class LyricCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {lyric: ''};
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.lyric.trim() === "") {
            console.log("Empty lyric is not fine");

        } else {
        this.props.mutate({
                    variables: {
                        content: this.state.lyric,
                        id: this.props.id
                    }
                }).then(() => {
                    this.setState({lyric: ''});
                    showSnackbar("New Lyric added!");

                });
        }
    }


    render() {
        return (
        <div className="row">
            <form  className = "col s12" onSubmit={this.onSubmit.bind(this)} id="createLyricForm">
            <div className="row">
                  <div className="input-field">
                   <i className="material-icons prefix">library_music</i>
                       <input id="create_lyric" type="text" placeholder="add some lyric"
                            onChange = {(event) => this.setState({lyric: event.target.value})}
                             value = {this.state.lyric}
                       />
                       <label htmlFor="create_lyric"></label>
                  </div>
              </div>
                <button className="btn-small right pink accent-2" type="submit">
                <i className="small material-icons">airline_seat_flat</i>
                </button>
            </form>
        </div>
        )
    }
}

const addLyricMutation = gql`
mutation addLyric($content: String, $id: ID) {
    addLyricToSong(content: $content, songId: $id) {
        id
        lyrics {
            id
            content
            likes
        }
    }
}
`;



export default graphql(addLyricMutation)(LyricCreate);