// @flow

import { combineReducers } from 'redux'

import listFilter from './listFilter'
import comments from './comments'
import posts from './posts'
import categories from './categories'

export default combineReducers({
  categories,
  comments,
  listFilter,
  posts,
});
