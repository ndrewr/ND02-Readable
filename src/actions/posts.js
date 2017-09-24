// @flow

import readableApi from '../utils/readableApi';

export function loadPosts() {  
  return function (dispatch) {
    return readableApi.getPosts()
    .then(posts => {
      dispatch(loadPostsSuccess(posts))
    }).catch(error => {
      console.log('error!')
      throw(error)
    });
  };
}

export function loadPostsSuccess(posts) {
  return ({
    type: 'POSTS_LOADED',
    posts,
  })
}
