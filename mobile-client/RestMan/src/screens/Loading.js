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

import { getTables } from '../actions'

class Loading extends React.Component {
  componentDidMount () {
    this.props.getTables()
    AsyncStorage.getItem('token', (err, result) => {
      if (result === null) {
        const goLogin = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]
        })
        this.props.navigation.dispatch(goLogin)
      } else {
        AsyncStorage.getItem('user', (err, result) => {
          let user = JSON.parse(result)
          if (user.role === 'waiter') {
            const goWaiter = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'WaiterDashboard'})
              ]
            })
            this.props.navigation.dispatch(goWaiter)
          } else if (user.role === 'cashier') {
            const goCashier = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'CashierDashboard'})
              ]
            })
            this.props.navigation.dispatch(goCashier)
          }
        })
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

const mapDispatchToProps = (dispatch) => {
  return {
    getTables: () => dispatch(getTables())
  }
}

export default connect(null, mapDispatchToProps)(Loading)