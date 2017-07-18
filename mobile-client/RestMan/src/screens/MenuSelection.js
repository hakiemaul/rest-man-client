import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Alert,
  Picker,
  AsyncStorage
} from 'react-native'
import {
  List,
  ListItem
} from 'react-native-elements'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'

import { addOrder, isOrdering, tableIsOrdering, emptyOrder } from '../actions'

const serv = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'

const { height, width } = Dimensions.get('window')
const cardHeight = 0.1 * height
const cardWidth = 0.75 * width
const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FC7100',
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
    height: 130,
    width: cardWidth,
    backgroundColor: '#443C35',
    borderWidth: 0.5,
    borderRadius: 6,
    padding: 15,
    marginBottom: 30,
    justifyContent: 'space-between'
  },
  text: {
    color: '#FFF',
    fontSize: 20
  }
}

class MenuSelection extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `Pemesanan ${navigation.state.params.table}`,
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

  _filteredMenu = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={{...styles.text, fontWeight: 'bold', fontSize: 15}}>{ item.name }</Text>
        <Text style={{...styles.text, fontStyle: 'italic', fontSize: 12}}>{ item.description }</Text>
      </TouchableOpacity>
      <Button
        onPress={() => this._addOrder(item) }
        title="Add to Order"
        color="green"
        accessibilityLabel="Do your job!"
      />
    </View>
  )

  _allMenu = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={{...styles.text, fontWeight: 'bold', fontSize: 15}}>{ item.name }</Text>
        <Text numberOfLines={1} style={{...styles.text, fontStyle: 'italic', fontSize: 12}}>{ item.description }</Text>
        <Text style={{...styles.text, fontSize: 12}}>Rp { item.price }</Text>
      </TouchableOpacity>
      { this.props.orders.some((_item) => { return _item.name == item.name}) ? (
        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
        <Text style={{...styles.text, fontSize: 12}}>Jumlah pesanan: </Text>
        <Button
          onPress={() => this._addOrder(item) }
          title="Sudah order"
          color="#73a4f4"
          accessibilityLabel="Do your job!"
        />
        </View>
      ) : <Button
        onPress={() => this._addOrder(item) }
        title="Add to Order"
        color="green"
        accessibilityLabel="Do your job!"
      />}
    </View>
  )

  _renderOrder = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => alert(item.price)}>
        <Text style={{...styles.text, fontWeight: 'bold', fontSize: 15}}>{ item.name }</Text>
        <Text style={{...styles.text, fontSize: 12}}>Qty: { item.qty_item }</Text>
        <Text style={{...styles.text, fontSize: 12}}>Harga satuan: { item.price }</Text>
      </TouchableOpacity>
    </View>
  )

  _searchReal (text) {
    if (text.length === 0) {
      this.setState({
        filtered: [],
        searchMenu: ''
      })
    } else {
      this.setState({
        filtered: this.props.menu.menus.filter(menu => {
          return menu.name.toLowerCase().includes(text)
        }),
        searchMenu: text
      })
    }
  }

  _addOrder (menu) {
    const newOrder = {
      name: menu.name,
      price: menu.price,
      qty_item: 1,
      id_menu: menu.id
    }
    let already = false
    for (let i = 0; i < this.props.orders.length; i++) {
      if (this.props.orders[i].name === newOrder.name) {
        this.props.orders[i].qty_item += 1
        let total = this.state.subtotal + this.props.orders[i].price
        this.setState({
          subtotal: total
        })
        this.props.addOrder(this.props.orders)
        already = true
      }
    }
    if (!already) {
      this.setState({
        subtotal: this.state.subtotal + newOrder.price
      })
      this.props.orders.push(newOrder)
      this.props.addOrder(this.props.orders)
    }
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
    this.props.navigation.navigate('Checkout', { table: this.props.navigation.state.params.table })
  }

  componentDidMount () {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result)
      this.setState({
        id: user.id
      })
      var free = []
      for (let key in this.props.table.tables) {
        this.props.table.tables[key].status === false ? free.push(this.props.table.tables[key]) : free
      }
      let price = this.props.orders.reduce((sum, value) => {
        return sum + (value.price * value.qty_item)
      }, 0)
      this.setState({
        free: free,
        subtotal: price
      })
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
            placeholder='Nama menu'
          />
          <View style={styles.listContainer}>
            <Text style={{...styles.text, marginLeft: 20, fontSize: 15}}>Hasil pencarian menu</Text>
            <FlatList
              data={this.state.filtered}
              renderItem={this._allMenu}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30, marginLeft: 44}}
            />
          </View>
          <View style={{ marginLeft: width/2.5}}>
          <Button
            onPress={() => this._goNext() }
            title="Lanjut"
            color="darkblue"
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
            placeholder='Nama menu'
          />
          <View style={styles.listContainer}>
            <Text style={{...styles.text, marginLeft: 20, fontSize: 15}}>Pesanan</Text>
            <FlatList
              data={this.props.menu.menus}
              renderItem={this._allMenu}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30, marginLeft: 44}}
            />
          </View>
          <View style={{ marginLeft: width/2.5, marginTop: 20 }}>
          <Button
            onPress={() => this._goNext() }
            title="Lanjut"
            color="darkblue"
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