import React from 'react'
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { tableIsDone } from '../actions'

const serv = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'

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
  constructor () {
    super ()
    this.state = {
      id: '',
      orders: [],
      total: 0,
      pay: 0,
      change: 0
    }
  }
  componentDidMount () {
    axios.get(serv + '/order/' + this.props.navigation.state.params.order)
    .then(response => {
      this.setState({
        id: response.data.id,
        orders: response.data.Menus,
        total: response.data.total_price
      })
    })
  }

  _doPay () {
    let self = this
    axios.post(serv + '/transaction', {
      id_order: this.state.id,
      pay: this.state.pay,
      refund: this.state.change
    })
    .then(response => {
      self.props.tableIsDone(self.props.navigation.state.params.name)
      const goCashier = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'CashierDashboard'})
        ]
      })
      self.props.navigation.dispatch(goCashier)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Detail Transaksi {this.props.navigation.state.params.name}</Text>
        {this.state.orders.map(order => (
          <View key={order.id}>
            <Text>{order.name}</Text>
            <Text>{order.MenuOrder.qty_item}</Text>
            <Text>{order.price}</Text>
          </View>
        ))}
        <Text style={styles.text}>Total harga {this.state.total}</Text>
        <TextInput
          onChangeText={(text) => this.setState({ pay: text })}
          onSubmitEditing={() => {
            let change = this.state.pay - this.state.total
            this.setState({
              change: change
            })
          }}
          value={ this.state.pay.toString() }
          style={{ width: 300, color: 'white' }}
          placeholderTextColor='white'
          placeholder='Jumlah bayar'
          keyboardType='phone-pad'
        />
        <Text style={styles.text}>Kembali {this.state.change}</Text>
        <View style={{ marginBottom: 50}}>
          <Button
            onPress={() => this._doPay() }
            title="Bayar"
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
    tableIsDone: (table) => dispatch(tableIsDone(table))
  }
}

export default connect(null, mapDispatchToProps)(Transaction)