// @flow

import readableApi from '../utils/readableApi';

import * as actions from '../actions/actionTypes';

type CommentFields = {
  author: String,
  body: String,
  id: String,
  parentId: String,
  timestamp: Number
};

type CommentAction = {
  type: String,
  comments?: Array<any>,
  comment?: CommentFields,
  commentData?: any
};

export function loadComment(comment_id: string) {
  return (dispatch: (action: CommentAction) => void) => {
    return readableApi
      .getComment(comment_id)
      .then(post => {
        dispatch({
          type: actions.COMMENT_LOADED,
          post: post
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function loadComments(post_id: string) {
  return (dispatch: (action: CommentAction) => void) => {
    return readableApi
      .getComments(post_id)
      .then(comments => {
        dispatch({
          type: actions.COMMENTS_LOADED,
          comments: comments
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function createComment(commentData: CommentFields) {
  return function(dispatch: (action: CommentAction) => void) {
    return readableApi
      .createNewComment(commentData)
      .then(comment => {
        dispatch({
          type: actions.NEW_COMMENT,
          commentData: comment
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function updateComment(
  comment_id: string,
  commentData: { title: string, body: string }
) {
  return function(dispatch: (action: CommentAction) => void) {
    return readableApi
      .updateComment(comment_id, commentData)
      .then(comment => {
        dispatch({
          type: actions.UPDATE_COMMENT,
          commentData: comment
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function updateScore(
  comment_id: string,
  updateType: { option: 'upVote' | 'downVote' }
) {
  return function(dispatch: (action: CommentAction) => void) {
    return readableApi
      .updateCommentScore(comment_id, updateType)
      .then(comment => {
        dispatch({
          type: actions.UPDATE_COMMENT_SCORE,
          commentData: comment
        });
      })
      .catch(error => {
        console.log('Comment vote score update error!');
        throw error;
      });
  };
}
