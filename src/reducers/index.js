// @flow

import { combineReducers } from 'redux'

// import listFilter from './listFilter'
import posts from './posts'
import categories from './categories'

export default combineReducers({
  categories,
  posts,
});
