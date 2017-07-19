import React from 'react'
import { View, Text, Image, StyleSheet, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

class Logout extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Logout',
    header: null,
  }

  componentDidMount () {
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
        setTimeout(() => {
          this.props.navigation.dispatch(goLogin)
        },2000)
      })
    })
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Text>Logging out...</Text>
      </View>
    );
  }
}

export default Logout