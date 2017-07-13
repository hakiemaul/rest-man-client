import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Profile'})
  ]
})

class Loading extends React.Component {
  componentDidMount () {
    AsyncStorage.getItem('token', (err, result) => {
      if (result.length === 0) {
        const goLogin = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]
        })
        this.props.navigation.dispatch(goLogin)
      } else {
        const goWaiter = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'WaiterDashboard'})
          ]
        })
        this.props.navigation.dispatch(goWaiter)
      }
    })
  }

  render () {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
}

export default Loading