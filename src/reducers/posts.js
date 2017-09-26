// @flow

import * as actions from '../actions/actionTypes'

type PostAction = {
  type: string,
  posts: Array<string>
};

const postsReducer = (
  state: Array<string> = [],
  action: PostAction,
) => {
  switch (action.type) {
    case actions.POSTS_LOADED:
      return action.posts
    default:
      return state
  }
}

export default postsReducer
