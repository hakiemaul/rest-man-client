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

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#4EA384',
  }
}

class CashierDashboard extends React.Component {
  constructor () {
    super ()
    this.state = {
      username: ''
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result)
      this.setState({
        username: user.username
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Selamat bekerja, {this.state.username}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    table: state.table
  }
}

export default connect(mapStateToProps, null)(CashierDashboard)