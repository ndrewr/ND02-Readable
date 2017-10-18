// @flow

import * as actions from '../actions/actionTypes';

type CommentAction = {
  type: String,
  comments?: Array<any>,
  commentData?: any,
  deletedCommentId?: string
};

const commentsReducer = (state: any = {}, action: CommentAction) => {
  switch (action.type) {
    case actions.COMMENTS_LOADED:
      return action.comments.reduce((commentCache, comment) => {
        commentCache[comment.id] = comment;
        return commentCache;
      }, {});
    case actions.NEW_COMMENT:
      return { ...state, [action.commentData.id]: action.commentData };
    case actions.UPDATE_COMMENT:
      return { ...state, [action.commentData.id]: action.commentData };
    case actions.UPDATE_COMMENT_SCORE:
      return { ...state, [action.commentData.id]: action.commentData };
    case actions.DELETE_COMMENT:
      return Object.keys(state).reduce((commentCache, comment_id) => {
        if (action.deletedCommentId !== comment_id) {
          commentCache[comment_id] = state[comment_id];
        }
        return commentCache;
      }, {});
    default:
      return state;
  }
};

export default commentsReducer;
