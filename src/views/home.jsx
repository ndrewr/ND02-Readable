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
  Statistic,
  // Visibility,
} from 'semantic-ui-react'

type Props = {
  categories: any,
  store: any,
};

type State = {
  sortFilter: string,
  posts: any,
};

class HomePage extends Component<Props, State> {
  // temp state
  state = {
    sortFilter: 'score-high',
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

  sortedList = () => {
    const { posts, sortFilter } = this.state
    // const { sortFilter } = this.state

    switch (sortFilter) {
      case 'time-ascending':
        return posts.sort((a, b): number => {
          if (a.timestamp > b.timestamp) return -1
          else if (a.timestamp === b.timestamp) return 0
          else return 1
        })
      case 'time-descending':
        return posts.sort((a, b): number => {
          if (a.timestamp > b.timestamp) return 1
          else if (a.timestamp === b.timestamp) return 0
          else return -1
        })
      default:
        return posts.sort((a, b): number => {
          if (a.voteScore > b.voteScore) return -1
          else if (a.voteScore === b.voteScore) return 0
          else return 1
        })
    }
  }

  render() {
    const { posts, sortFilter } = this.state
    const { categories } = this.props

    // <Image avatar src='/assets/images/avatar/small/rachel.png' />
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
              <Statistic>
                <Statistic.Label>Score</Statistic.Label>
                <Statistic.Value>{post.voteScore}</Statistic.Value>
              </Statistic>
            </List.Content>
        </List.Item>
    )

    return (
      <div className="home">
        <Header size="huge" textAlign="center" content="Home." dividing />
         <List>
          {this.sortedList().map((post) => <Post key={post.id} post={post} />)}
        </List>
      </div>
    );
  }
}

export default HomePage;
