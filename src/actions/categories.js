// @flow

import readableApi from '../utils/readableApi';

type CategoryAction = {
  type: string,
  categories: Array<string>
};

export function loadCategories() {  
  return function (dispatch: (action: CategoryAction) => void) {
    return readableApi.getCategories()
    .then(data => {
      dispatch(loadCategoriesSuccess(data.categories))
    }).catch(error => {
      console.log('error!')
      throw(error)
    });
  };
}

export function loadCategoriesSuccess(categories: Array<string>) {
  return ({
    type: 'CATEGORIES_LOADED',
    categories,
  })
}
