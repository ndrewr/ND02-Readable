// import * as ActionTypes from '../actions'
// import paginate from './paginate'
// import { combineReducers } from 'redux'

// saves User list filter settings between pages/views
const listFilterReducer = (
  state = {
    sortFilter: 'score',
    sortDirection: 'desc',
    posts: [], // how do I get this???
  },
  action
) => {
  // console.log('reducer: ', action)
  // return state

  const { posts, sortFilter, sortDirection } = this.state

  switch (`${sortFilter}-${sortDirection}`) {
    case 'time-asc':
      return posts.sort((a, b): number => {
        if (a.timestamp > b.timestamp) return 1
        else if (a.timestamp === b.timestamp) return 0
        else return -1
      })
    case 'time-desc':
      return posts.sort((a, b): number => {
        if (a.timestamp > b.timestamp) return -1
        else if (a.timestamp === b.timestamp) return 0
        else return 1
      })
    case 'score-asc':
      return posts.sort((a, b): number => {
        if (a.voteScore > b.voteScore) return 1
        else if (a.voteScore === b.voteScore) return 0
        else return -1
      })
    default:
      return posts.sort((a, b): number => {
        if (a.voteScore > b.voteScore) return -1
        else if (a.voteScore === b.voteScore) return 0
        else return 1
      })
  }
}
// const rootReducer = combineReducers({
  // pagination,
  // errorMessage,
// })

export default listFilterReducer