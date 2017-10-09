// @flow

import * as actions from '../actions/actionTypes'

type CommentAction = {
  type: String,
  comments?: Array<any>,
  commentData?: any,
};

const commentsReducer = (
  state: Array<any> = [],
  action: CommentAction,
) => {
  // console.log('Posts: incoming action...', action)
  switch (action.type) {
    case actions.COMMENTS_LOADED:
      return action.comments
    case actions.NEW_POST:
      return [...state, action.commentData]
    default:
      return state
  }
}

export default commentsReducer
