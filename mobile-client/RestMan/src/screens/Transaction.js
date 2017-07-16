import React from 'react'
import {
  View,
  Text
} from 'react-native'
import axios from 'axios'

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FC7100',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    margin: 10
  }
}

class Transaction extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Detail Transaksi {this.props.navigation.state.params.name}</Text>
      </View>
    )
  }
}

export default Transaction