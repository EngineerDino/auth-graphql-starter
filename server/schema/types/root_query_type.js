const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const UserType = require('./user_type');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');

const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    currentUser: {
        type: UserType,
        resolve(parentValue, args, req) {
            return req.user;
        }
    },
    songs: {
          type: new GraphQLList(SongType),
          resolve() {
            return Song.find({});
          }
        },
     song: {
          type: SongType,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve(parentValue, { id }) {
            return Song.findById(id);
          }
        },
     lyric: {
          type: LyricType,
          args: { id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve(parnetValue, { id }) {
            return Lyric.findById(id);
          }
      }
  })
});

module.exports = RootQueryType;
