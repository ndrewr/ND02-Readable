// @flow

import * as actions from '../actions/actionTypes'

const initialState = []

type CategoryAction = {
  type: string,
  categories: Array<string>
}

const categoryReducer = (
  state: Array<string> = initialState,
  action: CategoryAction,
) => {
  switch (action.type) {
    case actions.CATEGORIES_LOADED:
      return action.categories
    default:
      return state
  }
}

export default categoryReducer
