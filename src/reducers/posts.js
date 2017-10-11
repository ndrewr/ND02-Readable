// @flow

import * as actions from '../actions/actionTypes'

type PostAction = {
  type: string,
  posts?: Array<any>,
  postData?: any,
  deletedPostId?: string,
};

const postsReducer = (
  state: any = {},
  action: PostAction,
) => {
  console.log('Posts action: ', action)
  switch (action.type) {
    case actions.POSTS_LOADED:
      return action.posts.reduce((postCache, post) => {
        if (! post.deleted) {
          postCache[post.id] = post
        }
        return postCache
      }, {})
    case actions.NEW_POST:
      return { ...state, [action.postData.id]: action.postData }
    case actions.UPDATE_POST:
      return { ...state, [action.postData.id]: action.postData }
    case actions.DELETE_POST:
      return Object.keys(state).reduce((postCache, post_id) => {
        if (action.deletedPostId !== post_id) {
          postCache[post_id] = state[post_id]
        }
        return postCache
      }, {})
    default:
      return state
  }
}

export default postsReducer
