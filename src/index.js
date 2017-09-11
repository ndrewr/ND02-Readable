// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configureStore'

// import './index.css';

const AppContainer = () =>
  <Router>
    <App store={configureStore()} />
  </Router>

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
