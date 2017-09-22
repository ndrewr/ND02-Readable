// @flow

// import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

import listFilter from './listFilter'
import posts from './posts'

// const rootReducer = (state = {}, action) => {
//   console.log('reducer: ', action)
//   return state
// }
// const rootReducer = combineReducers({
  // pagination,
  // errorMessage,
// })

// function users (state = {}, action) {
//   // ...
// }

export default combineReducers({
  posts,
});

// export default rootReducer
