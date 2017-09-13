// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import './App.css';

// import AppLayout from './components/AppLayout'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'

type Props = {
  store: any,
};

type State = {
  cats: any,
};

class HomePage extends Component<Props, State> {
  // temp state
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

        // <Image avatar src='/assets/images/avatar/small/rachel.png' />

    const CatgoryItem = ({category}) => (
        <List.Item>
          <Icon circular name="cube" size="large" />
            <List.Content>
              <List.Header as='a'>{category.name}</List.Header>
              <Link to={`/category/${category.name}`}>
                <List.Description>see more</List.Description>
              </Link>
            </List.Content>
        </List.Item>
    )

    return (
      <div className="home">
        <Header size="huge" textAlign="center" content="Home." dividing />
          <List>
            {cats.map((category, index) => <CatgoryItem key={category.name + index} category={category} />)}
          </List>
      </div>
    );
  }
}

export default HomePage;
