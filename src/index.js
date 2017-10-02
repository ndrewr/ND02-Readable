// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configureStore'

const AppContainer = () =>
  <App store={configureStore()} />

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();
