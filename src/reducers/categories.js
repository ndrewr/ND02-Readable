// @flow

import * as actions from '../actions/actionTypes';

type CategoryAction = {
  type: string,
  categories: Array<string>
};

const categoryReducer = (state: Array<string> = [], action: CategoryAction) => {
  switch (action.type) {
    case actions.CATEGORIES_LOADED:
      return action.categories;
    default:
      return state;
  }
};

export default categoryReducer;
