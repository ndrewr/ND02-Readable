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

type State = {
  cats: any,
};

class App extends Component<Props, State> {
  state = {
    cats: []
  }

  componentDidMount() {
    const url = 'http://localhost:5001/categories'
    fetch(
      url,
      {
          headers: { 'Authorization': 'whatever-you-want' }
      }
    )
    .then((results) => {
      return results.json()
    })
    .then((data) => {
      console.log('fetching categories...', data)
      this.setState({cats: data.categories})
    })
    .catch((error) => {
      console.log('There was a problem. ', error)
    })
  }


  render() {
    const { cats } = this.state

    const wrapView = (ViewComponent) => {
      return (props) => <ViewComponent {...props} categories={cats} />
    }

    return (
      <Provider store={this.props.store}>
        <div className="App">
          <AppLayout categories={cats} >
            <Route exact path="/" render={wrapView(HomePage)} />
            <Route path="/category/:type" render={({ match }) => <h1>Category! {match.params.type}</h1>} />
          </AppLayout>
        </div>
      </Provider>
    );
  }
}

export default App;
