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

import { hasLoggedIn } from '../actions'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#4EA384',
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
        role: 'waiter'
      }
      AsyncStorage.setItem('token', token, () => {
        self.props.hasLoggedIn(user)
        self.props.navigation.navigate('WaiterDashboard')
      })
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token', (err, result) => {
      if (result.length > 0) {
        this.props.navigation.navigate('WaiterDashboard')
      }
    })
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
            placeholder='Employee username'
          />
          <TextInput
            onChangeText={(text) => this.setState({ password: text })}
            value={ this.state.password }
            style={{ width: 300 }}
            secureTextEntry={true}
            placeholder='Password'
          />
        </View>
        <View style={{ marginBottom: 50}}>
          <Button
            onPress={() => this._doLogin() }
            title="Login"
            color="#841584"
            accessibilityLabel="Do your job!"
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