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
import Comment from './Comment'

import { setSortDirection, setSortFilter } from '../actions/listFilter'

import { loadComments } from '../actions/comments'

type CommentListProps = {
  // category?: string,
  post_id: string,
  comments: Array<any>,
  loadComments: (string) => void,
  sortDirection: string,
  sortFilter: string,
  setFilter: () => mixed,
  setDirection: () => mixed
};

class CommentList extends Component<CommentListProps> {
  componentWillMount() {
    const { post_id, loadComments } = this.props

    loadComments(post_id)
  }

  sortedList = () => {
    const { comments, sortFilter, sortDirection } = this.props

    switch (`${sortFilter}-${sortDirection}`) {
      case 'time-asc':
        return comments.sort((a, b): number => {
          if (a.timestamp > b.timestamp) return 1
          else if (a.timestamp === b.timestamp) return 0
          else return -1
        })
      case 'time-desc':
        return comments.sort((a, b): number => {
          if (a.timestamp > b.timestamp) return -1
          else if (a.timestamp === b.timestamp) return 0
          else return 1
        })
      case 'score-asc':
        return comments.sort((a, b): number => {
          if (a.voteScore > b.voteScore) return 1
          else if (a.voteScore === b.voteScore) return 0
          else return -1
        })
      default:
        return comments.sort((a, b): number => {
          if (a.voteScore > b.voteScore) return -1
          else if (a.voteScore === b.voteScore) return 0
          else return 1
        })
    }
  }

  render() {
    const { sortFilter, sortDirection, setFilter, setDirection } = this.props

    return (
      <div className="comment-list">
        <ListDisplayControls
          direction={sortDirection}
          filter={sortFilter}
          options={['score', 'time']}
          onDirectionChange={setDirection}
          onFilterChange={setFilter}
        />
        <List>
          {this.sortedList().map(comment => <Comment key={comment.id} comment={comment} />)}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log('commentList...', state, props)
  const comments = props.post_id
    ? state.comments.filter(comment => props.post_id === comment.parentId)
    : state.comments

  return ({
    comments,
    sortDirection: state.listFilter.sortDirection,
    sortFilter: state.listFilter.sortFilter,
  });
}

const mapDispatchToProps = dispatch => ({
  loadComments: (post_id) => dispatch(loadComments(post_id)),

  setDirection: (selectedDirection) => dispatch(setSortDirection(selectedDirection)),
  setFilter: (selectedFilter) => dispatch(setSortFilter(selectedFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
