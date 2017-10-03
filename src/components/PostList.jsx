// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  // Divider,
  // Grid,
  // Header,
  // Icon,
  List,
  // Segment,
  // Statistic,
  // Visibility,
} from 'semantic-ui-react'

import ListDisplayControls from './ListDisplayControls'
import Post from './Post'

import { setSortDirection, setSortFilter } from '../actions/listFilter'

type PostListProps = {
  category?: string,
  posts: Array<any>,
  sortDirection: string,
  sortFilter: string,
  setFilter: () => mixed,
  setDirection: () => mixed
};

class PostList extends Component<PostListProps> {
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
    const { sortFilter, sortDirection, setFilter, setDirection } = this.props

    return (
      <div className="post-list">
        <ListDisplayControls
          direction={sortDirection}
          filter={sortFilter}
          options={['score', 'time']}
          onDirectionChange={setDirection}
          onFilterChange={setFilter}
        />
        <List>
          {this.sortedList().map(post => <Post key={post.id} post={post} />)}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const posts = props.category
    ? state.posts.filter(post => props.category === post.category)
    : state.posts

  return ({
    posts,
    sortDirection: state.listFilter.sortDirection,
    sortFilter: state.listFilter.sortFilter,
  });
}

const mapDispatchToProps = dispatch => ({
  setDirection: (selectedDirection) => dispatch(setSortDirection(selectedDirection)),
  setFilter: (selectedFilter) => dispatch(setSortFilter(selectedFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
