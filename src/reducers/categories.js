// @flow
// import * as ActionTypes from '../actions'

const initialState = []

type CategoryAction = {
  type: string,
  categories: Array<string>
};

const categoryReducer = (
  state: Array<string> = initialState,
  action: CategoryAction,
) => {
  switch (action.type) {
    case 'CATEGORIES_LOADED':
      return action.categories
    default:
      return state
  }
}

export default categoryReducer
