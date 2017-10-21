// @flow

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppLayout from '../components/AppLayout';

import CategoryPage from '../views/CategoryPage';
import HomePage from '../views/HomePage';
import PostPage from '../views/PostPage';

type AppProps = {
  categories: Array<string>,
  store: any
};

const App = ({ categories, store }: AppProps) => {
  // NOTE: need to wrap if passing addtl props to the View component bout to be rendered
  const wrapView = ViewComponent => {
    return props => <ViewComponent {...props} />;
  };

  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <AppLayout categories={categories}>
            <Route exact path="/" component={HomePage} />
            <Route path="/category/:category_name" component={CategoryPage} />
            <Route path="/post/:post_id" render={wrapView(PostPage)} />
          </AppLayout>
        </div>
      </Provider>
    </Router>
  );
};

const mapStateToProps = state => ({
  categories: state.categories || []
});

export default connect(mapStateToProps)(App);
