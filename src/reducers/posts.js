// @flow

import * as actions from '../actions/actionTypes'

type PostAction = {
  type: String,
  posts?: Array<any>,
  postData?: any,
};

// const postsReducer = (
//   state: Array<any> = [],
//   action: PostAction,
// ) => {
//   switch (action.type) {
//     case actions.POSTS_LOADED:
//       return action.posts
//     case actions.NEW_POST:
//       return [...state, action.postData]
//     case actions.UPDATE_POST:
//       return [...state, action.postData]
//     default:
//       return state
//   }
// }

const postsReducer = (
  state: any = {},
  action: PostAction,
) => {
  console.log('Posts action: ', action)
  switch (action.type) {
    case actions.POSTS_LOADED:
      return action.posts.reduce((postCache, post) => {
        postCache[post.id] = post
        return postCache
      }, {})
    case actions.NEW_POST:
      return { ...state, [action.postData.id]: action.postData }
    case actions.UPDATE_POST:
      return { ...state, [action.postData.id]: action.postData }
    default:
      return state
  }
}

export default postsReducer
