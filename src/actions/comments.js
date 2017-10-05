// @flow

import readableApi from '../utils/readableApi';

import * as actions from '../actions/actionTypes'

type CommentAction = {
  type: String,
  comments?: Array<any>,
  comment?: CommentFields,
  commentData?: any,
};

type CommentFields = {
  author: String,
  body: String,
  id: String,
  parent_id: String,
  timestamp: Number,
}

export function loadPost(comment_id: string) {  
  return (dispatch: (action: CommentAction) => void) => {
    return readableApi.getPost(comment_id)
    .then(post => {
      dispatch({
        type: actions.POST_LOADED,
        post: post,
      })
    })
    .catch(error => {
      console.log('error!')
      throw(error)
    });
  };
}

export function loadComments() {  
  return (dispatch: (action: CommentAction) => void) => {
    return readableApi.getPosts()
    .then(comments => {
      dispatch({
        type: actions.COMMENTS_LOADED,
        comments: comments,
      })
    })
    .catch(error => {
      console.log('error!')
      throw(error)
    });
  };
}

export function newPost(commentData: CommentFields) {
  return function (dispatch: (action: CommentAction) => void) {
    return readableApi.createNewPost(commentData)
    .then(comment => {
      dispatch({
        type: actions.NEW_COMMENT,
        commentData: comment,
      })
    })
    .catch(error => {
      console.log('error!')
      throw(error)
    });
  }
}
