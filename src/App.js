import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { StatusBar } from 'react-native'

import configureStore from './store'
import Api from './Api'
import { Navigator } from './Navigator'
import { API_URI } from './constants'

console.disableYellowBox = true // eslint-disable-line no-console

const initialState = {}
const api = new Api(API_URI)
const { store, persistor } = configureStore(initialState, { api })

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <>
            <StatusBar barStyle="light-content" />
            <Navigator />
          </>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
