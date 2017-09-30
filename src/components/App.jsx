// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import AppLayout from '../components/AppLayout'

import HomePage from '../views/home'

type AppProps = {
  store: any,
  categories: Array<string>
};

const App = ({ categories, store } : AppProps) => {
  const wrapView = (ViewComponent) => {
    return (props) => <ViewComponent {...props} categories={categories} />
  }

  return (
    <Provider store={store}>
      <div className="App">
        <AppLayout categories={categories} >
          <Route exact path="/" render={wrapView(HomePage)} />
          <Route path="/category/:type" render={({ match }) => <h1>Category! {match.params.type}</h1>} />
        </AppLayout>
      </div>
    </Provider>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories || [],
})

export default connect(mapStateToProps)(App)
