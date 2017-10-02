// @flow

import React from 'react';
import { connect } from 'react-redux';
// import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import AppLayout from '../components/AppLayout'

// import CategoryPage from '../views/CategoryPage'
import HomePage from '../views/HomePage'

type AppProps = {
  categories: Array<string>,
  store: any,
};

const App = ({ categories, store } : AppProps) => {
  // needed if passing addtl props to the View component bout to be rendered
  // const wrapView = (ViewComponent) => {
  //   return (props) => <ViewComponent {...props} />
  // }

  const CategoryPage = ({ match }) => {
    console.log('render category')
    return <h1>Category! {match.params.type}</h1>
  }

  console.log('render view!')
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <AppLayout categories={categories}>
            <Route exact path="/" component={HomePage} />
            <Route path="/category/:type" render={CategoryPage} />
          </AppLayout>
        </div>
      </Provider>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories || [],
})

export default connect(mapStateToProps)(App)
