import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { autoRehydrate } from 'redux-persist'

import reducers from './reducers'
import { routerMiddleware } from './Navigator'

export default function configureStore(initialState = {}, { api }) {
  const shouldLog = process.env.NODE_ENV !== 'production'

  const middlewares = [
    thunk.withExtraArgument({ api }),
    promiseMiddleware(),
    routerMiddleware,
  ]

  if (shouldLog) middlewares.push(logger)

  const enhancer = compose(
    applyMiddleware(...middlewares),
    autoRehydrate({ log: shouldLog })
  )

  const store = createStore(reducers, initialState, enhancer)
  return store
}
