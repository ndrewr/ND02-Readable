// @flow

import * as actions from '../actions/actionTypes';

export function setSortDirection(selectedDirection: 'asc' | 'desc') {
  return {
    type: actions.SET_LIST_DIRECTION,
    filter: {
      sortDirection: selectedDirection
    }
  };
}

export function setSortFilter(selectedFilter: 'time' | 'score') {
  return {
    type: actions.SET_LIST_FILTER,
    filter: {
      sortFilter: selectedFilter
    }
  };
}
