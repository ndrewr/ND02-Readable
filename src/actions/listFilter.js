// @flow

import * as actions from '../actions/actionTypes'

type ListFilter = {
  sortDirection?: string,
  sortFilter?: string
}

type FilterAction = {
  type: string,
  filter: ListFilter
};

export function setSortDirection (selectedDirection: string) {
  return {
    type: actions.SET_LIST_DIRECTION,
    filter: {
      sortDirection: selectedDirection
    }
  }
}

export function setSortFilter (selectedFilter: string) {
  return {
    type: actions.SET_LIST_FILTER,
    filter: {
      sortFilter: selectedFilter
    }
  }
}
