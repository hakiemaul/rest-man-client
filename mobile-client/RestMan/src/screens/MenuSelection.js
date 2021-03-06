import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Alert,
  Picker,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import {
  List,
  ListItem,
  Button
} from 'react-native-elements'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'
import { FormattedWrapper, FormattedNumber } from 'react-native-globalize'

import { addOrder, isOrdering, tableIsOrdering, emptyOrder } from '../actions'

const serv = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'

const { height, width } = Dimensions.get('window')
const cardHeight = 0.1 * height
const cardWidth = 0.9 * width
const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  listContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  card: {
    height: 150,
    width: cardWidth,
    backgroundColor: '#253951',
    padding: 15,
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  text: {
    color: '#020d19',
    fontSize: 20
  }
}

class MenuSelection extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `Pemesanan ${navigation.state.params.table}`,
    headerTitleStyle: {
      color: '#fff'
    },
    headerStyle: {
      backgroundColor: '#253951'
    },
    headerTintColor: '#fff'
  })

  constructor () {
    super ()
    this.state = {
      searchMenu: '',
      filtered: [],
      table: null,
      free: [],
      subtotal: 0,
      id: null
    }
  }

  _allMenu = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => alert(item.description)}>
        <Text style={{...styles.text, fontWeight: 'bold', fontSize: 15, color: '#fff'}}>{ item.name }</Text>
        <Text numberOfLines={1} style={{...styles.text, fontStyle: 'italic', fontSize: 12, color: '#fff'}}>{ item.description }</Text>
        <Text style={{...styles.text, fontSize: 12, color: '#fff'}}>Rp <FormattedNumber
          value={item.price}
          minimumFractionDigits={2}
          style={{ color: '#fff' }} /></Text>
      </TouchableOpacity>
      { (this.state.orders[this.state.orders.indexOf(item)].qty_item !== null ) ? (
        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
        <Text style={{...styles.text, fontSize: 12, color: '#fff'}}>Jumlah pesanan: {item.qty_item}</Text>
        <Button
          onPress={() => this._addOrder(item) }
          title="PESAN LAGI"
          backgroundColor="#73a4f4"
          color="#fff"
          fontWeight="bold"
          accessibilityLabel="Do your job!"
        />
        </View>
      ) : <Button
        onPress={() => this._addOrder(item) }
        title="TAMBAHKAN"
        backgroundColor="green"
        color="#fff"
        fontWeight="bold"
        accessibilityLabel="Do your job!"
      />}
    </View>
  )

  // { this.props.orders.some((_item) => { return _item.name == item.name}) ? (
  //   <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
  //   <Text style={{...styles.text, fontSize: 12, color: '#fff'}}>Jumlah pesanan: {item.qty_item}</Text>
  //   <Button
  //     onPress={() => this._addOrder(item) }
  //     title="SUDAH ORDER"
  //     backgroundColor="#73a4f4"
  //     color="#fff"
  //     fontWeight="bold"
  //     accessibilityLabel="Do your job!"
  //   />
  //   </View>
  // ) : <Button
  //   onPress={() => this._addOrder(item) }
  //   title="TAMBAHKAN"
  //   backgroundColor="green"
  //   color="#fff"
  //   fontWeight="bold"
  //   accessibilityLabel="Do your job!"
  // />}

  _searchReal (text) {
    if (text.length === 0) {
      this.setState({
        filtered: [],
        searchMenu: ''
      })
    } else {
      this.setState({
        filtered: this.state.orders.filter(menu => {
          return menu.name.toLowerCase().includes(text)
        }),
        searchMenu: text
      })
    }
  }

  _addOrder (menu) {
    // const newOrder = {
    //   name: menu.name,
    //   price: menu.price,
    //   qty_item: 1,
    //   id_menu: menu.id
    // }
    // let already = false
    // for (let i = 0; i < this.props.orders.length; i++) {
    //   if (this.props.orders[i].name === newOrder.name) {
    //     this.props.orders[i].qty_item += 1
    //     let total = this.state.subtotal + this.props.orders[i].price
    //     this.setState({
    //       subtotal: total
    //     })
    //     this.props.addOrder(this.props.orders)
    //     already = true
    //   }
    // }
    // if (!already) {
    //   this.setState({
    //     subtotal: this.state.subtotal + newOrder.price
    //   })
    //   this.props.orders.push(newOrder)
    //   this.props.addOrder(this.props.orders)
    // }
    let flag = this.state.orders.indexOf(menu)
    if (this.state.orders[flag].qty_item === null) {
      this.state.orders[flag].qty_item = 1
    } else {
      this.state.orders[flag].qty_item++
    }
    this.setState({
      orders: this.state.orders
    })
  }

  _clearOrder () {
    this.props.emptyOrder()
    let orders = this.props.menu.menus.map(menu => {
      return { ...menu, qty_item: null, id_menu: menu.id }
    })
    this.setState({
      orders: orders
    })
  }

  _doneOrdering () {
    // AXIOS ACTION CREATE MENU-ORDER
    Alert.alert( 'Konfirmasi Pesanan', 'Apakah pelanggan sudah selesai memesan?', [  {text: 'Cancel', onPress: () => {}, style: 'cancel'}, {text: 'OK', onPress: () => {
      let self = this
      // alert(this.state.table || this.state.free[0].name)
      axios.post(serv + '/order', {
        no_meja: this.props.navigation.state.params.table,
        id_employee: this.state.id,
        total_price: this.state.subtotal,
        menu_order: this.props.orders
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

  _goNext () {
    let filtered = this.state.orders.filter(order => {
      return order.qty_item !== null
    })
    this.props.addOrder(filtered)
    this.props.navigation.navigate('Checkout', { table: this.props.navigation.state.params.table })
  }

  componentDidMount () {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result)
      this.setState({
        id: user.id
      })
      let price = this.props.orders.reduce((sum, value) => {
        return sum + (value.price * value.qty_item)
      }, 0)
      let orders = this.props.menu.menus.map(menu => {
        return { ...menu, qty_item: null, id_menu: menu.id }
      })
      this.setState({
        subtotal: price,
        orders: orders
      })
      // setTimeout(() => {
      // }, 2000)
    })
  }

  componentWillReceiveProps () {
    let price = this.props.orders.reduce((sum, value) => {
      return sum + (value.price * value.qty_item)
    }, this.state.subtotal)
    this.setState({
      subtotal: price
    })
  }

  render () {
    if (this.state.searchMenu.length > 0) {
      return (
        <View style={styles.container}>
          <TextInput
            onChangeText={(text) => this._searchReal(text)}
            value={ this.state.searchMenu }
            style={{ width: 300, marginLeft: 20 }}
            placeholder='Cari menu'
          />
          <View style={styles.listContainer}>
            <Text style={{...styles.text, marginLeft: 20, fontSize: 15}}>Hasil pencarian menu</Text>
            <FlatList
              data={this.state.filtered}
              renderItem={this._allMenu}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30, marginLeft: 0.05 * width}}
            />
          </View>
          <View style={{ width: width, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, marginTop: 10 }}>
          <Button
            onPress={() => this._clearOrder() }
            title="CLEAR ORDER"
            backgroundColor="gray"
            color="#fff"
            fontWeight="bold"
            icon={{name: 'remove-shopping-cart'}}
            accessibilityLabel="Do your job!"
          />
          <Button
            onPress={() => this._goNext() }
            iconRight
            title="LANJUT"
            backgroundColor="darkblue"
            color="#fff"
            fontWeight="bold"
            icon={{name: 'send'}}
            accessibilityLabel="Do your job!"
          />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <TextInput
            onChangeText={(text) => this._searchReal(text)}
            value={ this.state.searchMenu }
            style={{ width: 300, marginLeft: 20 }}
            placeholder='Cari menu'
          />
          {(this.state.orders) ? (<View style={styles.listContainer}>
            <Text style={{...styles.text, marginLeft: 20, fontSize: 15}}>Daftar Menu</Text>
            <FlatList
              data={this.state.orders}
              renderItem={this._allMenu}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30, marginLeft: 0.05 * width}}
            />
          </View>) : (<View style={{width: width, height: height - 100, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' />
            <Text style={styles.text}>Mendapatkan menu..</Text>
          </View>)}
          <View style={{ width: width, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, marginTop: 10 }}>
          <Button
            onPress={() => this._clearOrder() }
            title="CLEAR ORDER"
            backgroundColor="gray"
            color="#fff"
            fontWeight="bold"
            icon={{name: 'remove-shopping-cart'}}
            accessibilityLabel="Do your job!"
          />
          <Button
            onPress={() => this._goNext() }
            iconRight
            title="LANJUT"
            backgroundColor="darkblue"
            color="#fff"
            fontWeight="bold"
            icon={{name: 'send'}}
            accessibilityLabel="Do your job!"
          />
          </View>
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    orders: state.order.orders,
    table: state.table
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addOrder: (orders) => dispatch(addOrder(orders)),
    isOrdering: (table) => dispatch(isOrdering(table)),
    tableIsOrdering: (table, order) => dispatch(tableIsOrdering(table, order)),
    emptyOrder: () => dispatch(emptyOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSelection)