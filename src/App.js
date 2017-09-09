// @flow

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

class App extends Component<{}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Readable.</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category/pirates">Pirates</Link></li>
            <li><Link to="/category/ninjas">Ninjas</Link></li>
            <li><Link to="/category/sharks">Sharks</Link></li>
          </ul>
        </div>
        <p className="App-intro">
          What are you waiting for?
        </p>
        <Route exact path="/" component={() => <h1>Home!</h1>} />
        <Route path="/category/:type" render={({ match }) => <h1>Category! {match.params.type}</h1>} />
      </div>
    );
  }
}

export default App;
