// @flow

import readableApi from '../utils/readableApi';

import * as actions from '../actions/actionTypes'

type PostAction = {
  type: String,
  posts: Array<String>
};

type PostFields = {
  author: String,
  body: String,
  category: String,
  id: String,
  timestamp: Number,
  title: String, 
}

export function loadPosts() {  
  return function (dispatch: (action: PostAction) => void) {
    return readableApi.getPosts()
    .then(posts => {
      dispatch(loadPostsSuccess(posts))
    }).catch(error => {
      console.log('error!')
      throw(error)
    });
  };
}

export function loadPostsSuccess(posts: Array<String>): PostAction {
  return ({
    type: actions.POSTS_LOADED,
    posts,
  })
}

export function newPost(postData: PostFields) {
  return ({
    type: actions.NEW_POST,
    postData,
  })
}
