// @flow
// import * as ActionTypes from '../actions'

const initialState = []

const postsReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'POSTS_LOADED':
      return action.posts
    default:
      return state
  }
}

export default postsReducer
