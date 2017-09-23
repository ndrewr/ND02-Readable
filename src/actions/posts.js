// @flow

import readableApi from '../utils/readableApi';

export function loadPosts() {  
  return function (dispatch) {
    return readableApi.getPosts()
    .then(posts => {
      // console.log('action loadPosts: ', posts)
      dispatch(loadPostsSuccess(posts))
    }).catch(error => {
      console.log('error!')
      throw(error)
    });
  };
}

export function loadPostsSuccess(posts) {
  // console.log('posts loaded!', posts)
  return ({
    type: 'POSTS_LOADED',
    posts,
  })
}
