// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configureStore'

// import { loadPosts } from './actions/posts'

const store = configureStore()

// store.dispatch(loadPosts())
// .then(() => console.log('get state...', store.getState()))

const AppContainer = () =>
  <Router>
    <App store={store} />
  </Router>

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
