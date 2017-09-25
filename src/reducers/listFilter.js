// @flow
// import * as ActionTypes from '../actions'

const initialState = {
  sortFilter: 'score',
  sortDirection: 'desc'
}

type ListFilter = {
  sortDirection?: string,
  sortFilter?: string
}

type FilterAction = {
  type: string,
  filter: ListFilter
};

// saves User list filter settings between pages/views
const listFilterReducer = (
  state: ListFilter = initialState,
  action: FilterAction
) => {
  // console.log('reducer: ', action)
  // const { sortDirection, sortFilter } = action.filter
  const newState = {...state, ...action.filter}

  switch (action.type) {
    case 'SET_LIST_DIRECTION':
    case 'SET_LIST_FILTER':
      return `${newState.sortFilter}-${newState.sortDirection}`
    default:
      return state      
  }
}

export default listFilterReducer
