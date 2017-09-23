import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'
// import api from '../middleware/api'
import rootReducer from '../reducers'
// import DevTools from '../containers/DevTools'

import { loadPosts } from '../actions/posts'
import { loadCategories } from '../actions/categories'



const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk)
      // applyMiddleware(thunk, api, createLogger()),
      // DevTools.instrument()
    )
  )

  // if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // module.hot.accept('../reducers', () => {
      // const nextRootReducer = require('../reducers').default
      // store.replaceReducer(nextRootReducer)
    // })
  // }

  // fetch initial data
  store.dispatch(loadCategories())
  store.dispatch(loadPosts())

  return store
}

export default configureStore
