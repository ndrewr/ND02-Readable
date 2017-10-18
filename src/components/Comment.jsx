// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form, Icon } from 'semantic-ui-react';

import ScoreDisplay from './ScoreDisplay';

import { deleteComment, updateComment, updateScore } from '../actions/comments';

import formatTime from '../utils/formatTime';

type CommentFields = {
  voteScore?: number,
  body?: string,
  id: string,
  timestamp: number,
  author?: string
};

type CommentProps = {
  comment: any,
  deleteComment: () => void,
  updateComment: any => void,
  updateVoteScore: string => void
};

type CommentState = {
  commentBody: string,
  editMode: boolean
};

class CommentItem extends Component<CommentProps, CommentState> {
  state = {
    commentBody: this.props.comment.body,
    editMode: false
  };

  styles = {
    commentContainer: {
      minHeight: '90px'
    },
    scoreContainer: {
      float: 'left'
    },
    contentContainer: {
      paddingTop: '20px'
    },
    actionButton: {
      marginLeft: '10px'
    }
  };

  toggleFormVisibility = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  };

  handleChange = event => {
    this.setState({ commentBody: event.target.value });
  };

  handleSubmit = event => {
    const { updateComment } = this.props;
    const { commentBody } = this.state;

    updateComment({
      body: commentBody,
      timestamp: Date.now()
    });

    this.toggleFormVisibility();
  };

  updateScore = event => {
    const { updateVoteScore } = this.props;

    document.activeElement && document.activeElement.blur();

    // dispatch vote score update
    updateVoteScore(event.currentTarget.value);
  };

  deleteComment = () => {
    const { comment, deleteComment } = this.props;

    console.log('will delete comment with id...', comment.id);

    deleteComment();
  };

  render() {
    const { comment } = this.props;
    const { commentBody, editMode } = this.state;

    return (
      <Comment style={this.styles.commentContainer}>
        <div style={this.styles.scoreContainer}>
          <ScoreDisplay
            score={comment.voteScore}
            size="tiny"
            updateScore={this.updateScore}
          />
        </div>
        <Comment.Content style={this.styles.contentContainer}>
          <Comment.Author as="span">{comment.author} says:</Comment.Author>
          <Comment.Metadata>
            <span>on {formatTime(comment.timestamp)}</span>
          </Comment.Metadata>
          <Comment.Actions as="span">
            <Comment.Action>
              <Button
                compact
                icon={editMode ? 'left arrow' : 'configure'}
                size="mini"
                style={this.styles.actionButton}
                onClick={this.toggleFormVisibility}
              />
            </Comment.Action>
            <Comment.Action>
              <Button
                compact
                icon="remove"
                size="mini"
                style={this.styles.actionButton}
                onClick={this.deleteComment}
              />
            </Comment.Action>
          </Comment.Actions>
          {!editMode ? (
            <Comment.Text>{comment.body}</Comment.Text>
          ) : (
            <Comment.Text>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Input
                    placeholder="Change it up"
                    name="comment_body"
                    value={commentBody}
                    width={14}
                    onChange={this.handleChange}
                  />
                  <Form.Button content="Submit" />
                </Form.Group>
              </Form>
            </Comment.Text>
          )}
        </Comment.Content>
      </Comment>
    );
  }
}

const mapDispatchToProps = (dispatch, { comment }) => ({
  deleteComment: () => dispatch(deleteComment(comment.id)),
  updateVoteScore: (vote: 'upVote' | 'downVote') =>
    dispatch(updateScore(comment.id, { option: vote })),
  updateComment: commentFields =>
    dispatch(updateComment(comment.id, commentFields))
});

export default connect(null, mapDispatchToProps)(CommentItem);
