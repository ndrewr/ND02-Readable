// @flow

import readableApi from '../utils/readableApi';

import * as actions from '../actions/actionTypes';

type PostFields = {
  author: string,
  body: string,
  category: string,
  id: string,
  timestamp: number,
  title: string
};

type PostAction = {
  type: string,
  posts?: Array<any>,
  post?: PostFields,
  postData?: any,
  deletedPostId?: string
};

export function loadPost(post_id: string) {
  return (dispatch: (action: PostAction) => void) => {
    return readableApi
      .getPost(post_id)
      .then(post => {
        dispatch({
          type: actions.POST_LOADED,
          post: post
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function loadPosts() {
  return (dispatch: (action: PostAction) => void) => {
    return readableApi
      .getPosts()
      .then(posts => {
        dispatch({
          type: actions.POSTS_LOADED,
          posts: posts
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function newPost(postData: PostFields) {
  return function(dispatch: (action: PostAction) => void) {
    return readableApi
      .createNewPost(postData)
      .then(post => {
        dispatch({
          type: actions.NEW_POST,
          postData: post
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function updatePost(
  post_id: string,
  postData: { title: string, body: string }
) {
  return function(dispatch: (action: PostAction) => void) {
    return readableApi
      .updatePost(post_id, postData)
      .then(post => {
        dispatch({
          type: actions.UPDATE_POST,
          postData: post
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}

export function updateScore(
  post_id: string,
  updateType: { option: 'upVote' | 'downVote' }
) {
  return function(dispatch: (action: PostAction) => void) {
    return readableApi
      .updatePostScore(post_id, updateType)
      .then(post => {
        console.log('hi');
        dispatch({
          type: actions.UPDATE_POST_SCORE,
          postData: post
        });
      })
      .catch(error => {
        console.log('Post vote score update error!');
        throw error;
      });
  };
}

export function deletePost(post_id: string) {
  return function(dispatch: (action: PostAction) => void) {
    return readableApi
      .deletePost(post_id)
      .then(result => {
        console.log('post deleted! ', post_id, result);
        dispatch({
          type: actions.DELETE_POST,
          deletedPostId: post_id
        });
      })
      .catch(error => {
        console.log('error!');
        throw error;
      });
  };
}
