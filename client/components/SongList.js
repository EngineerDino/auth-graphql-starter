import React, {Component } from 'react'
import gql from 'graphql-tag';
import {Link} from 'react-router';
import {graphql} from 'react-apollo'
import songQuery from '../queries/fetchSongs';
import { showSnackbar } from './emitter';

class SongList extends Component {

    renderSongs() {
        return  this.props.data.songs.map(({id, title} )=> {
            return (
                <li className="collection-item purple lighten-4 " key={id}>
                    <Link to={`/song/${id}`} className="song-link">{title}</Link>
                        <i onClick={() => this.deleteSong(id)} className="material-icons secondary-content black-text">
                        delete
                        </i>

                 </li>
                 );
              }
            );
    }

    deleteSong(id: ID) {
        this.props.mutate({
            variables: {
                id
            },
              refetchQueries: [{ query: songQuery }]
        }).then(() => showSnackbar("Sucessfully deleted!"))

    }

    render() {
    if (this.props.data.loading) {
       return <div> </div>
    }
    return (
    <div className="row">
    <ul className="collection with-header">
    <li className="collection-header purple lighten-5 "> <h3>Your Songs</h3></li>
        {this.renderSongs()}
     </ul>
     <Link to="/song/new">
        <button className="btn-floating btn-large waves-effect deep-purple lighten-2 right "> <i className="material-icons">add</i></button>
     </Link>
     </div>
      )
    }
}


const deleteMutation = gql`
    mutation deleteSong($id: ID) {
        deleteSong(id: $id) { id, title}
    }
`

export default graphql(deleteMutation)(graphql(songQuery)(SongList));