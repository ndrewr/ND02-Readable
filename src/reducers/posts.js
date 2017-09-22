// @flow
// import * as ActionTypes from '../actions'

// saves User list filter settings between pages/views
const initialState = {
  posts: [],
  hi: 'hi',
}

const postsReducer = (
  state = initialState,
  action,
) => {
  console.log('reducer: ', action)
  switch (action.type) {
    case 'POSTS_LOADED':
      return action.posts
    default:
      console.log('reducing...default: ', state, action)
      return state
  }
}

export default postsReducer
