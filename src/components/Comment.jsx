// @flow

import React from 'react';
import { Comment } from 'semantic-ui-react';

import ScoreDisplay from './ScoreDisplay';

import formatTime from '../utils/formatTime';

type CommentFields = {
  voteScore?: number,
  body?: string,
  id: string,
  timestamp: number,
  author?: string
};

const CommentItem = ({ comment }: { comment: CommentFields }) => {
  const styles = {
    commentContainer: {
      minHeight: '90px'
    },
    scoreContainer: {
      float: 'left'
    },
    contentContainer: {
      paddingTop: '20px'
    }
  };

  const cb = e => console.log('score update', e);

  return (
    <Comment style={styles.commentContainer}>
      <div style={styles.scoreContainer}>
        <ScoreDisplay score={comment.voteScore} size="tiny" updateScore={cb} />
      </div>
      <Comment.Content style={styles.contentContainer}>
        <Comment.Author as="span">{comment.author} says:</Comment.Author>
        <Comment.Metadata>
          <span>on {formatTime(comment.timestamp)}</span>
        </Comment.Metadata>
        <Comment.Text>{comment.body}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default CommentItem;
