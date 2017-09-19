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

import ListDisplayControls from '../components/ListDisplayControls'

type Props = {
  categories: any,
  store: any,
};

type State = {
  sortDirection: string,
  sortFilter: string,
  posts: any,
};


class HomePage extends Component<Props, State> {
  // temp state
  state = {
    sortDirection: 'desc',
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
    const { posts, sortFilter, sortDirection } = this.state

    switch (`${sortFilter}-${sortDirection}`) {
      case 'time-asc':
        return posts.sort((a, b): number => {
          if (a.timestamp > b.timestamp) return 1
          else if (a.timestamp === b.timestamp) return 0
          else return -1
        })
      case 'time-desc':
        return posts.sort((a, b): number => {
          if (a.timestamp > b.timestamp) return -1
          else if (a.timestamp === b.timestamp) return 0
          else return 1
        })
      default:
        return posts.sort((a, b): number => {
          if (a.voteScore > b.voteScore) return -1
          else if (a.voteScore === b.voteScore) return 0
          else return 1
        })
    }
  }

  setSortDirection = (selectedDirection: string) => {
    this.setState({ sortDirection: selectedDirection })
  }

  setSortFilter = (selectedFilter: string) => {
    this.setState({ sortFilter: selectedFilter })
  }

  render() {
    const { posts, sortFilter } = this.state
    const { categories } = this.props

    // <Image avatar src='/assets/images/avatar/small/rachel.png' />
          // <Icon circular name="cube" size="large" />
    const Post = ({post}) => (
        <List.Item style={{marginBottom: '1rem'}}>
          <List.Content>
            <Statistic floated="left" size="small" style={{width: '4rem', marginRight: '2rem'}}>
              <Statistic.Value style={{textAlign: 'right'}}>
                {post.voteScore}
              </Statistic.Value>
            </Statistic>
            <List.Header as='a'>
              {post.title}
            </List.Header>
            <Link to={`/post/${post.id}`}>
              <List.Description>
                posted {new Date(post.timestamp).toLocaleDateString()} by {post.author}
              </List.Description>
            </Link>
          </List.Content>
        </List.Item>
    )

    return (
      <div className="home">
        <Header size="huge" textAlign="center" content="Making life more Readable!" dividing />
        <ListDisplayControls
          options={['score', 'time']}
          onFilterChange={this.setSortFilter}
          onDirectionChange={this.setSortDirection}
        />
        <List>
          {this.sortedList().map((post) => <Post key={post.id} post={post} />)}
        </List>
      </div>
    );
  }
}

export default HomePage;
