// @flow

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import './App.css';

import readableApi from './utils/readableApi'

import AppLayout from './components/AppLayout'

import HomePage from './views/home'

type Props = {
  store: any,
};

type State = {
  categories: any,
};

class App extends Component<Props, State> {
  state = {
    categories: []
  }

  componentDidMount() {
    readableApi.getCategories().then((data) => {
      this.setState({categories: data.categories})
    })
  }


  render() {
    const { categories } = this.state

    const wrapView = (ViewComponent) => {
      return (props) => <ViewComponent {...props} categories={categories} />
    }

    return (
      <Provider store={this.props.store}>
        <div className="App">
          <AppLayout categories={categories} >
            <Route exact path="/" render={wrapView(HomePage)} />
            <Route path="/category/:type" render={({ match }) => <h1>Category! {match.params.type}</h1>} />
          </AppLayout>
        </div>
      </Provider>
    );
  }
}

export default App;
