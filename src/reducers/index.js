// import * as ActionTypes from '../actions'
// import paginate from './paginate'
import { combineReducers } from 'redux'

const rootReducer = (state = {}, action) => {
  console.log('reducer: ', action)
  return state
}
// const rootReducer = combineReducers({
  // pagination,
  // errorMessage,
// })

export default rootReducer