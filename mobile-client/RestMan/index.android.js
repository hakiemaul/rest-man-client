import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'
import { Provider } from 'react-redux'
import { FormattedWrapper } from 'react-native-globalize'

import App from './src/App'
import store from './src/store'

class RestMan extends Component {
  render () {
    return (
      <Provider store={store}>
        <FormattedWrapper locale="id">
          <App />
        </FormattedWrapper>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('RestMan', () => RestMan);
