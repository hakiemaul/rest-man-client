import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  AsyncStorage
} from 'react-native'
import {
  FormLabel,
  FormInput,
  Card,
  Button
} from 'react-native-elements'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'

import { hasLoggedIn } from '../actions'

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    marginTop: 60,
    fontWeight: 'bold',
    color: '#020d19'
  }
}

const serv = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'

class Login extends React.Component {
  static navigationOptions = {
    title: 'RESTMan',
    headerTitleStyle: {
      color: '#fff'
    },
    headerStyle: {
      backgroundColor: '#253951'
    }
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
      axios.post(serv + '/auth/login', {
        username: self.state.username,
        password: self.state.password
      })
      .then(response => {
        if (!response.data.token) {
          alert('No user found')
        }
        let token = response.data.token
        let user = {
          username: response.data.username,
          role: response.data.role.toLowerCase(),
          id: response.data.id
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
      })
      .catch(err => console.log(err))

      // mockup data
      // let token = '12i9301j239j2109i390'
      // let user = {
      //   username: self.state.username,
      //   role: 'waiter'
      // }
      // AsyncStorage.setItem('token', token, () => {
      //   AsyncStorage.setItem('user', JSON.stringify(user), () => {
      //     const goLoad = NavigationActions.reset({
      //       index: 0,
      //       actions: [
      //         NavigationActions.navigate({ routeName: 'Loading'})
      //       ]
      //     })
      //     this.props.navigation.dispatch(goLoad)
      //   })
      // })
    }
  }

  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'flex-start',}}>
        <Card title="LOGIN">
          <View>
            <FormLabel>Username</FormLabel>
            <FormInput onChangeText={(text) => this.setState({ username: text })}/>
            <FormLabel>Password</FormLabel>
            <FormInput onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true}/>
            <Button
              onPress={() => this._doLogin() }
              raised
              backgroundColor="#2fad4c"
              icon={{name: 'cached'}}
              title='LOGIN' />
          </View>
        </Card>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hasLoggedIn: (user) => dispatch(hasLoggedIn(user))
  }
}

export default connect(null, mapDispatchToProps)(Login)