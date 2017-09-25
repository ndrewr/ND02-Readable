// @flow

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
    type: 'SET_LIST_DIRECTION',
    filter: {
      sortDirection: selectedDirection
    }
  }
}

export function setSortFilter (selectedFilter: string) {
  return {
    type: 'SET_LIST_FILTER',
    filter: {
      sortFilter: selectedFilter
    }
  }
}

// export function loadCategories() {  
//   return function (dispatch: (action: FilterAction) => void) {
//     return readableApi.getCategories()
//     .then(data => {
//       dispatch(loadCategoriesSuccess(data.categories))
//     }).catch(error => {
//       console.log('error!')
//       throw(error)
//     });
//   };
// }

// export function loadCategoriesSuccess(categories: Array<string>) {
//   return ({
//     type: 'CATEGORIES_LOADED',
//     categories,
//   })
// }
