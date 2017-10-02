// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  // Button,
  // Container,
  // Divider,
  // Grid,
  Header,
  // Icon,
  // Image,
  List,
  // Menu,
  // Segment,
  Statistic,
  // Visibility,
} from 'semantic-ui-react'

import ListDisplayControls from '../components/ListDisplayControls'
import PostCreator from '../components/PostCreator'

import { setSortDirection, setSortFilter } from '../actions/listFilter'

type Props = {
  categories: Array<any>,
  posts: Array<any>,
  sortDirection: String,
  sortFilter: String,
  setFilter: () => mixed,
  setDirection: () => mixed
};

class HomePage extends Component<Props> {
  sortedList = () => {
    const { posts, sortFilter, sortDirection } = this.props

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
      case 'score-asc':
        return posts.sort((a, b): number => {
          if (a.voteScore > b.voteScore) return 1
          else if (a.voteScore === b.voteScore) return 0
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
    const { categories, sortFilter, sortDirection, setFilter, setDirection } = this.props

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
        <PostCreator categories={categories} />
        <ListDisplayControls
          direction={sortDirection}
          filter={sortFilter}
          options={['score', 'time']}
          onFilterChange={setFilter}
          onDirectionChange={setDirection}
        />
        <List>
          {this.sortedList().map((post) => <Post key={post.id} post={post} />)}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  // console.log('home page...', state)
  return ({
    categories: state.categories.map(category => category.name),
    posts: state.posts || [],
    sortDirection: state.listFilter.sortDirection,
    sortFilter: state.listFilter.sortFilter,
  });
}

const mapDispatchToProps = dispatch => ({
  setFilter: (selectedFilter) => dispatch(setSortFilter(selectedFilter)),
  setDirection: (selectedDirection) => dispatch(setSortDirection(selectedDirection))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
