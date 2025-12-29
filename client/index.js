import React from 'react';
import './style/style.css';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';
import CreateSong from './components/CreateSong';
import SongDetail from './components/SongDetail';


const client = new ApolloClient({
  dataIdFromObject: o => o.id || null,
});

const Root = () => {
  return (
  <ApolloProvider client = {client} >
  <Router  history={hashHistory}>
    <Route path="/" component={App}>
        <Route path="login" component={Login}>
        </Route>
        <Route path="signup" component={Signup}>
        </Route>
         <Route path="dashboard" component={requireAuth(Dashboard)}>
          </Route>
          <Route path="song/new" component={requireAuth(CreateSong)}>
          </Route>
          <Route path= "/song/:id" component={requireAuth(SongDetail)} />
    </Route>
   </Router>
   </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
