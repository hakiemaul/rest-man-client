import React from 'react'
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'

import { getTables, getMenus } from '../actions'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#020d19'
  }
}

class Loading extends React.Component {
  static navigationOptions = {
    header: null,
  }

  componentDidMount () {
    this.props.getTables()
    this.props.getMenus()
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
        },1000)
      } else {
        AsyncStorage.getItem('user', (err, result) => {
          let user = JSON.parse(result)
          if (user.role === 'waiters') {
            const goWaiter = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'MainWaiter'})
              ]
            })
            setTimeout( () => {
              this.props.navigation.dispatch(goWaiter)
            },4000)
          } else if (user.role === 'cashier') {
            const goCashier = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'MainCashier'})
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
        <Image
          style={{width: 240, height: 255}}
          source={require('../assets/logo.png')}
        />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTables: () => dispatch(getTables()),
    getMenus: () => dispatch(getMenus())
  }
}

export default connect(null, mapDispatchToProps)(Loading)