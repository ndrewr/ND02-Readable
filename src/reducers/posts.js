// @flow

import * as actions from '../actions/actionTypes';

type PostAction = {
  type: string,
  posts?: Array<any>,
  postData?: any,
  deletedPostId?: string
};

const postsReducer = (state: any = {}, action: PostAction) => {
  switch (action.type) {
    case actions.NEW_POST:
    case actions.UPDATE_POST:
    case actions.UPDATE_POST_SCORE:
      return { ...state, [action.postData.id]: action.postData };
    case actions.POSTS_LOADED:
      return action.posts.reduce((postCache, post) => {
        if (!post.deleted) {
          postCache[post.id] = post;
        }
        return postCache;
      }, {});
    case actions.DELETE_POST:
      return Object.keys(state).reduce((postCache, post_id) => {
        if (action.deletedPostId !== post_id) {
          postCache[post_id] = state[post_id];
        }
        return postCache;
      }, {});
    default:
      return state;
  }
};

export default postsReducer;
