// @flow
// import * as ActionTypes from '../actions'

type PostAction = {
  type: string,
  posts: Array<string>
};

const postsReducer = (
  state: Array<string> = [],
  action: PostAction,
) => {
  switch (action.type) {
    case 'POSTS_LOADED':
      return action.posts
    default:
      return state
  }
}

export default postsReducer
