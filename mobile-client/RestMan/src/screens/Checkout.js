import React from 'react'
import { AsyncStorage, Alert, View, Text, Image, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'
import { FormattedWrapper, FormattedNumber } from 'react-native-globalize'

import { addOrder, tableIsOrdering, emptyOrder } from '../actions'

const serv = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'
const styles = {
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 10
  },
  name: {
    fontWeight: 'bold'
  },
  price: {}
}

class Checkout extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor () {
    super ()
    this.state = {
      subtotal: 0,
      id: null
    }
  }

  _addQty (item, index) {
    let edited = this.props.orders.map((d, i) => {
      if (index === i) {
        d.qty_item++
      }
      return d
    })
    let total = this.state.subtotal + this.props.orders[index].price
    // alert(edited)
    this.props.addOrder(edited)
    this.setState({
      subtotal: total
    })
  }

  _remQty (item, index) {
    let edited = this.props.orders.map((d, i) => {
      if (index === i) {
        d.qty_item--
      }
      return d
    })
    let edited2 = this.props.orders.filter((d) => {
      return d.qty_item >= 0
    })
    this.props.addOrder(edited2)
    let total = this.state.subtotal - this.props.orders[index].price
    this.setState({
      subtotal: total
    })
  }

  _doneOrdering () {
    // AXIOS ACTION CREATE MENU-ORDER
    Alert.alert( 'Konfirmasi Pesanan', 'Apakah pelanggan sudah selesai memesan?', [  {text: 'Cancel', onPress: () => {}, style: 'cancel'}, {text: 'OK', onPress: () => {
      let self = this
      let edited = this.props.orders.filter((d) => {
        return d.qty_item > 0
      })
      // alert(this.state.table || this.state.free[0].name)
      axios.post(serv + '/order', {
        no_meja: this.props.navigation.state.params.table,
        id_employee: this.state.id,
        total_price: this.state.subtotal,
        menu_order: edited
      })
      .then(response => {
        self.props.tableIsOrdering(self.props.navigation.state.params.table, response.data.id)
        self.props.emptyOrder()
        const goWaiter = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'WaiterDashboard'})
          ]
        })
        self.props.navigation.dispatch(goWaiter)
      })
    }}, ], { cancelable: false } )
  }

  componentDidMount () {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result)
      let price = this.props.orders.reduce((sum, value) => {
        return sum + (value.price * value.qty_item)
      }, 0)
      this.setState({
        subtotal: price,
        id: user.id
      })
    })
  }

  render () {
    return (
      <ParallaxScrollView
        parallaxHeaderHeight={200}
        backgroundColor='white'
        renderForeground={() => (
          <View style={{ height: 300, flex: 1 }}>
            <Card title="RINGKASAN" containerStyle={{padding: 20}} >
              <View>
                <Text>Subtotal Rp <FormattedNumber
                  value={this.state.subtotal}
                  minimumFractionDigits={2} /></Text>
                <Text></Text>
              </View>
            </Card>
            {(this.state.subtotal > 0) ? (<Button
              raised
              icon={{name: 'shopping-cart'}}
              onPress={() => this._doneOrdering()}
              title='SELESAI'
              backgroundColor='#73a4f4' />) : (<Button
                raised
                disabled
                icon={{name: 'shopping-cart'}}
                onPress={() => this._doneOrdering()}
                title='SELESAI'
                backgroundColor='#73a4f4' />)}
          </View>
        )}
        renderStickyHeader={() => (
          <View style={{ height: 40, backgroundColor: "#73a4f4", padding: 10 }}>
            <Text style={{ color: '#fff' }}>Subtotal Rp <FormattedNumber
              value={this.state.subtotal}
              minimumFractionDigits={2} /></Text>
          </View>
        )}
        stickyHeaderHeight={40}>
        <Card title="ITEMS" containerStyle={{padding: 20}} >
        {
          this.props.orders.map((u, i) => {
            return (
              <View key={i} style={{marginBottom: 10}}>
                <View style={styles.user}>
                  <View>
                    <Text style={styles.name}>{u.name}</Text>
                    <Text style={styles.price}>{u.name}</Text>
                  </View>
                  <Text style={styles.price}>Rp <FormattedNumber
                    value={u.price}
                    minimumFractionDigits={2} /></Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {u.qty_item>0 ? (<Icon
                    raised
                    name='remove'
                    color='#f50'
                    style={10}
                    onPress={() => this._remQty(u, i)} />) : (<View></View>)}
                  <Text style={{marginLeft: 10, marginRight: 10}}>{u.qty_item}</Text>
                  <Icon
                    raised
                    name='add'
                    color='#f50'
                    style={10}
                    onPress={() => this._addQty(u, i)} />
                </View>
              </View>
            );
          })
        }
        </Card>
        <Button
          raised
          icon={{name: 'add'}}
          title='TAMBAH ORDER'
          onPress={() => this.props.navigation.goBack()}
          backgroundColor='#2fad4c' />
      </ParallaxScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addOrder: (orders) => dispatch(addOrder(orders)),
    tableIsOrdering: (table, order) => dispatch(tableIsOrdering(table, order)),
    emptyOrder: () => dispatch(emptyOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)