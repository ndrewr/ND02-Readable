// @flow

import readableApi from '../utils/readableApi';

type PostAction = {
  type: string,
  posts: Array<string>
};

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

export function loadPostsSuccess(posts: Array<string>) {
  return ({
    type: 'POSTS_LOADED',
    posts,
  })
}
