import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native'
import {
  FormLabel,
  FormInput
} from 'react-native-elements'
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

const serv = 'http://localhost:3000'

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
      // axios.get(serv + '/auth/login', {
      //   username: self.state.username,
      //   password: self.state.password
      // })
      // .then(response => {
      //   let token = response.data.token
      //   let user = {
      //     username: response.data.username,
      //     role: response.data.role
      //   }
      //   AsyncStorage.setItem('token', token, () => {
      //     AsyncStorage.setItem('user', JSON.stringify(user), () => {
      //       const goLoad = NavigationActions.reset({
      //         index: 0,
      //         actions: [
      //           NavigationActions.navigate({ routeName: 'Loading'})
      //         ]
      //       })
      //       this.props.navigation.dispatch(goLoad)
      //     })
      //   })
      // })
      // .catch(err => console.log(err))

      // mockup data
      let token = '12i9301j239j2109i390'
      let user = {
        username: self.state.username,
        role: 'waiter'
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
            style={{ width: 300, color: 'white' }}
            placeholderTextColor='white'
            placeholder='Employee username'
          />
          <TextInput
            onChangeText={(text) => this.setState({ password: text })}
            value={ this.state.password }
            style={{ width: 300, color: 'white' }}
            secureTextEntry={true}
            placeholderTextColor='white'
            placeholder='Password'
          />
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={() => {}}/>
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