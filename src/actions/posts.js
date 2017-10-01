// @flow

import readableApi from '../utils/readableApi';

import * as actions from '../actions/actionTypes'

type PostAction = {
  type: String,
  posts?: Array<any>,
  postData?: any,
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
  return (dispatch: (action: PostAction) => void) => {
    return readableApi.getPosts()
    .then(posts => {
      dispatch(loadPostsSuccess(posts))
    }).catch(error => {
      console.log('error!')
      throw(error)
    });
  };
}

export function loadPostsSuccess(posts: Array<any>): PostAction {
  return {
    type: actions.POSTS_LOADED,
    posts: posts,
  }
}

export function newPost(postData: PostFields) {
  console.log(readableApi)
  return function (dispatch: (action: PostAction) => void) {
    return readableApi.createNewPost(postData)
      // .then(() => console.log('donezo'))
      .then(post => {
        console.log('Successfully Created Post? ...', post);
        dispatch({
          type: actions.NEW_POST,
          postData: post,
        })
      })
  }
}
