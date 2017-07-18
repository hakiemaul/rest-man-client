import React from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert
} from 'react-native'
import axios from 'axios'
import { Card, ListItem, Button, Icon, FormInput, FormLabel } from 'react-native-elements'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { FormattedNumber } from 'react-native-globalize'

import { tableIsDone } from '../actions'

const serv = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'

const styles = {
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold'
  },
  text: {
    color: '#000',
    fontSize: 20,
    margin: 20
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
        total: response.data.total_price,
        change: -response.data.total_price
      })
    })
  }

  _doPay () {
    if (this.state.change >= 0) {
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
    } else {
      alert('Pembayaran belum cukup!')
    }
  }

  _cancelOrder () {
    Alert.alert( 'Konfirmasi Pembatalan', 'Apakah transaksi dibatalkan?', [  {text: 'Cancel', onPress: () => {}, style: 'cancel'}, {text: 'OK', onPress: () => {
      let self = this
      axios.delete(serv + '/order/' + this.state.id)
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
    }}, ], { cancelable: true } )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Detail Transaksi {this.props.navigation.state.params.name}</Text>
        <Card title="ITEMS" containerStyle={{padding: 20}} >
        {
          this.state.orders.map((u, i) => {
            return (
              <View key={i} style={{marginBottom: 10}}>
                <View style={styles.user}>
                  <View>
                    <Text style={styles.name}>{u.name}</Text>
                    <Text style={styles.price}>Rp <FormattedNumber
                      value={u.price}
                      minimumFractionDigits={2} /></Text>
                  </View>
                  <Text style={styles.price}>Qty: {u.MenuOrder.qty_item}</Text>
                </View>
              </View>
            );
          })
        }
        </Card>
        <Text style={styles.text}>Total harga Rp <FormattedNumber
          value={this.state.total}
          minimumFractionDigits={2} /></Text>
        <FormLabel>Pembayaran</FormLabel>
        <FormInput
          onChangeText={(text) => this.setState({ pay: text })}
          onSubmitEditing={() => {
            let change = this.state.pay - this.state.total
            this.setState({
              change: change
            })
          }}
          value={ this.state.pay.toString() }
          style={{fontSize: 20, color: '#000' }}
          placeholderTextColor='#000'
          placeholder='Jumlah bayar'
          keyboardType='phone-pad'/>
        <Text style={styles.text}>Kembali Rp
          {(this.state.change >= 0) ? (<Text> <FormattedNumber
            value={this.state.change}
            minimumFractionDigits={2} /></Text>) : (<Text> <FormattedNumber
              value={0}
              minimumFractionDigits={2} /></Text>)}
        </Text>
        <View style={{ marginBottom: 50}}>
          <Button
          raised
          icon={{name: 'monetization-on'}}
          onPress={() => this._doPay()}
          title='BAYAR'
          backgroundColor='#2fad4c'
          />
        </View>
        <View style={{ marginBottom: 50}}>
          <Button
          raised
          icon={{name: 'delete'}}
          onPress={() => this._cancelOrder()}
          title='BATAL PESAN'
          backgroundColor='red'
          />
        </View>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tableIsDone: (table) => dispatch(tableIsDone(table))
  }
}

export default connect(null, mapDispatchToProps)(Transaction)