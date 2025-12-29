import React, { Component } from 'react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import { Link, hashHistory} from 'react-router'
import LyricCreate from './LyricCreate'
import detailQuery from '../queries/songDetail'
import deleteLyric from '../queries/deleteLyric'
import likeLyric from '../queries/likeLyric'
import LinkButton from './LinkButton'
import { showSnackbar } from './emitter';

class SongDetail extends Component {

    deleteLyric(id: ID) {
        console.log("Deleting lyric with id:" + id);
        this.props.deleteLyric({
            variables: { id },
             refetchQueries: [{ query: detailQuery, variables: { id: this.props.params.id } }]
        }).then(() => showSnackbar("Successfully deleted!"));
    }

    likeLyric(id: ID, likes) {
        console.log("Liking Lyric with id:" + id);
        this.props.likeLyric({
            variables: {id},
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    likes: likes + 1,
                    __typename: 'LyricType'
                }
            }
        });
    }

    renderLyrics() {
        return this.props.data.song.lyrics.map(({content, id, likes}) => {
                     return (
                        <li key={id} className="collection-item pink lighten-4">

                            {content}
                            <div className=" button-box">
                                <div className="like-box">
                                      <i onClick={() => this.likeLyric(id,likes)} className="material-icons">
                                      thumb_up
                                      </i>
                                      <span className="text-black">({likes}) </span>
                                </div>
                                 <i onClick={() => this.deleteLyric(id)} className="material-icons">
                                    delete
                                 </i>
                             </div>



                         </li>
                        );
                    })
    }

    render() {
    const {song }= this.props.data;
    if (!song) {
     return( <div>
                  LOADING ...
                    </div>)
    }
        return (
        <div className="row">
         <LinkButton to="/dashboard" classNames="pink lighten-4 back-link" iconName="arrow_back"/>
         <ul className="collection with-header">
            <li className="collection-header pink lighten-5"> <h4> {song.title} </h4></li>
            {this.renderLyrics()}
         </ul>
            <LyricCreate id={this.props.params.id}></LyricCreate>
        </div>

        )

    }
}

export default compose(
graphql(deleteLyric, { name: "deleteLyric" }),
graphql(likeLyric, { name: "likeLyric" }))(graphql(detailQuery, { options: (props) => { return { variables: {id: props.params.id}}}})(SongDetail));