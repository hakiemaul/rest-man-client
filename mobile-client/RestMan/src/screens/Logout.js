import React from 'react'
import { Button, Image, StyleSheet, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

class Logout extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Logout'
  }

  _doLogout () {
    AsyncStorage.removeItem('token', (err, result) => {
      this.setState({
        token: ''
      })
      AsyncStorage.removeItem('user', (err, result) => {
        this.setState({
          username: ''
        })
        const goLogin = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]
        })
        this.props.navigation.dispatch(goLogin)
      })
    })
  }

  render() {
    return (
      <Button
        onPress={() => this._doLogout()}
        title="Go back home"
      />
    );
  }
}

export default Logout