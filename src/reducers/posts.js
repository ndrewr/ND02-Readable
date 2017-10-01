// @flow

import * as actions from '../actions/actionTypes'

type PostAction = {
  type: String,
  posts?: Array<any>,
  postData?: any,
};

const postsReducer = (
  state: Array<any> = [],
  action: PostAction,
) => {
  console.log('Posts: incoming action...', action)
  switch (action.type) {
    case actions.POSTS_LOADED:
      return action.posts
    case actions.NEW_POST:
      return [...state, action.postData]
    default:
      return state
  }
}

export default postsReducer
