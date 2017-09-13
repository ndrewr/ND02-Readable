// @flow

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import './App.css';

import AppLayout from './components/AppLayout'

import HomePage from './views/home'

// const Root = ({ store }) => (
//   <Provider store={store}>
//     <div>
//       <Route path="/" component={App} />
//       <Route path="/:login/:name"
//              component={RepoPage} />
//       <Route path="/:login"
//              component={UserPage} />
//       <DevTools />
//     </div>
//   </Provider>
// )

type Props = {
  store: any,
};

class App extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <div className="App">
          <AppLayout>
            <Route exact path="/" component={HomePage} />
            <Route path="/category/:type" render={({ match }) => <h1>Category! {match.params.type}</h1>} />
          </AppLayout>
        </div>
      </Provider>
    );
  }
}

export default App;
