// @flow

import { combineReducers } from 'redux';

import categories from './categories';
import comments from './comments';
import listFilter from './listFilter';
import posts from './posts';

export default combineReducers({
  categories,
  comments,
  listFilter,
  posts
});
