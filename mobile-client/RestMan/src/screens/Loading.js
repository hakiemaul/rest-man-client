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

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FC7100',
  },
  text: {
    fontSize: 20,
    color: '#fff'
  }
}

class Loading extends React.Component {
  static navigationOptions = {
    header: null,
  }

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
        setTimeout( () => {
          this.props.navigation.dispatch(goLogin)
        },4000)
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
            setTimeout( () => {
              this.props.navigation.dispatch(goWaiter)
            },4000)
          } else if (user.role === 'cashier') {
            const goCashier = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'CashierDashboard'})
              ]
            })
            setTimeout( () => {
              this.props.navigation.dispatch(goCashier)
            },4000)
          }
        })
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Take a rest</Text>
        <Text style={styles.text}>We do the rest</Text>
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