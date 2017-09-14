// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  // Button,
  // Container,
  // Divider,
  // Grid,
  Header,
  Icon,
  // Image,
  List,
  // Menu,
  // Segment,
  // Visibility,
} from 'semantic-ui-react'

type Props = {
  categories: any,
  store: any,
};

type State = {
  posts: any,
};

class HomePage extends Component<Props, State> {
  // temp state
  state = {
    posts: []
  }
  componentDidMount() {
    const url = 'http://localhost:5001/posts'
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
      console.log('fetching posts...', data)
      this.setState({posts: data})
    })
    .catch((error) => {
      console.log('There was a problem. ', error)
    })
  }

  render() {
    const { posts } = this.state
    const { categories } = this.props

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

    const Post = ({post}) => (
        <List.Item>
          <Icon circular name="cube" size="large" />
            <List.Content>
              <List.Header as='a'>
                {post.title}
              </List.Header>
              <Link to={`/post/${post.id}`}>
                <List.Description>
                  by {post.author} on {new Date(post.timestamp).toDateString()}
                </List.Description>
              </Link>
            </List.Content>
        </List.Item>
    )

    return (
      <div className="home">
        <Header size="huge" textAlign="center" content="Home." dividing />
        <List>
          {categories.map((category, index) => <CatgoryItem key={category.name + index} category={category} />)}
        </List>
         <List>
          {posts.map((post) => <Post key={post.id} post={post} />)}
        </List>
      </div>
    );
  }
}

export default HomePage;
