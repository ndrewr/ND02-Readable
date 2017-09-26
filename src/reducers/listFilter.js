// @flow

import * as actions from '../actions/actionTypes'

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

const listFilterReducer = (
  state: ListFilter = initialState,
  action: FilterAction
) => {
  const newState = {...state, ...action.filter}

  switch (action.type) {
    case actions.SET_LIST_DIRECTION:
    case actions.SET_LIST_FILTER:
      return {
        sortFilter: newState.sortFilter,
        sortDirection: newState.sortDirection
      }
    default:
      return state      
  }
}

export default listFilterReducer
