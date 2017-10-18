// @flow

import React, { Component } from 'react';
import { Button, Comment, Form, Icon } from 'semantic-ui-react';

import ScoreDisplay from './ScoreDisplay';

import formatTime from '../utils/formatTime';

type CommentFields = {
  voteScore?: number,
  body?: string,
  id: string,
  timestamp: number,
  author?: string
};

// const CommentItem = ({
//   comment,
//   updateVoteScore
// }: {
//   comment: CommentFields,
//   updateVoteScore: (string, string) => void
// }) => {

type CommentProps = {
  comment: any,
  updateVoteScore: (string, string) => void
};

type CommentState = {
  editMode: boolean
};

class CommentItem extends Component<CommentProps, CommentState> {
  state = {
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

  updateScore = event => {
    const { comment, updateVoteScore } = this.props;

    document.activeElement && document.activeElement.blur();

    // dispatch vote score update
    updateVoteScore(comment.id, event.currentTarget.value);
  };

  render() {
    const { comment } = this.props;
    const { editMode } = this.state;

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
                onClick={this.toggleFormVisibility}
              />
            </Comment.Action>
          </Comment.Actions>
          {!editMode ? (
            <Comment.Text>{comment.body}</Comment.Text>
          ) : (
            <Comment.Text>
              <Form onSubmit={() => console.log('submit')}>
                <Form.Group>
                  <Form.Input
                    placeholder="Change it up"
                    name="comment_body"
                    value={comment.body}
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

export default CommentItem;
