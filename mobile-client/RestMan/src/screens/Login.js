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

import { hasLoggedIn } from '../actions'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FC7100',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    marginTop: 60,
    fontWeight: 'bold',
    color: 'white'
  }
}

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login Page'
  }

  constructor () {
    super ()
    this.state = {
      username: '',
      password: ''
    }
  }

  _doLogin () {
    let self = this
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      alert('Please enter your username and password')
    } else {
      // axios action here
      // axios.post('LOGIN_ENDPOINT')
      // .then(response => {
      //   self.props.hasLoggedIn(response.data)
      //   if (response.data.role === 'waiter') {
      //     self.props.navigation.navigate('WaiterDashboard')
      //   } else if (response.data.role === 'cashier') {
      //     self.props.navigation.navigate('CashierDashboard')
      //   } else if (response.data.role === 'admin') {
      //     self.props.navigation.navigate('AdminDashboard')
      //   }
      // })
      // .catch(err => console.log(err))

      // mockup data
      let token = '12i9301j239j2109i390'
      let user = {
        username: self.state.username,
        role: 'cashier'
      }
      AsyncStorage.setItem('token', token, () => {
        AsyncStorage.setItem('user', JSON.stringify(user), () => {
          const goLoad = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Loading'})
            ]
          })
          this.props.navigation.dispatch(goLoad)
        })
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to RESTMan Companion App!</Text>
        <View>
          <TextInput
            onChangeText={(text) => this.setState({ username: text })}
            value={ this.state.username }
            style={{ width: 300 }}
            placeholderTextColor='white'
            placeholder='Employee username'
          />
          <TextInput
            onChangeText={(text) => this.setState({ password: text })}
            value={ this.state.password }
            style={{ width: 300 }}
            secureTextEntry={true}
            placeholderTextColor='white'
            placeholder='Password'
          />
        </View>
        <View style={{ marginBottom: 50}}>
          <Button
            onPress={() => this._doLogin() }
            title="Login"
            color="#443C35"
            accessibilityLabel="Do your job!"
            style={{width: 200}}
          />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hasLoggedIn: (user) => dispatch(hasLoggedIn(user))
  }
}

export default connect(null, mapDispatchToProps)(Login)