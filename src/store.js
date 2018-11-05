import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'
import { routerMiddleware } from './Navigator'

const persistConfig = {
  blacklist: ['bikes'],
  key: 'root',
  storage,
}
const persistedReducers = persistReducer(persistConfig, reducers)

export default function configureStore(initialState = {}, { api }) {
  const shouldLog = process.env.NODE_ENV !== 'production'

  const middlewares = [
    thunk.withExtraArgument({ api }),
    promiseMiddleware(),
    routerMiddleware,
  ]

  if (shouldLog) middlewares.push(logger)

  const store = createStore(
    persistedReducers,
    initialState,
    applyMiddleware(...middlewares)
  )

  const persistor = persistStore(store)

  // To clear the store
  // persistor.purge()

  return { store, persistor }
}
