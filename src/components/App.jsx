// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import readableApi from '../utils/readableApi'

import AppLayout from '../components/AppLayout'

import HomePage from '../views/home'

type Props = {
  store: any,
  categories: Array<string>
};

// refactor to stateless component
class App extends Component<Props> {
  render() {
    const { categories } = this.props

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

const mapStateToProps = (state) => ({
  categories: state.categories || [],
})

export default connect(mapStateToProps)(App)
