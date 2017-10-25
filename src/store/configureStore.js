import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import { loadPosts } from '../actions/posts';
import { loadCategories } from '../actions/categories';

const configureStore = () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

  // fetch initial data
  store.dispatch(loadCategories());
  store.dispatch(loadPosts());

  return store;
};

export default configureStore;
