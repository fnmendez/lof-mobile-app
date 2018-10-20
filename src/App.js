import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from './store'
import { Navigator } from './Navigator'

console.disableYellowBox = true // eslint-disable-line no-console

const initialState = {}
const store = configureStore(initialState)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}

export default App
