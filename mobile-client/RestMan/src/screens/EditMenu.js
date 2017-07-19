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
  AsyncStorage
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

import { editOrder, isOrdering, tableIsOrdering, emptyOrder } from '../actions'

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
    height: 130,
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
    title: `Tambah Pesanan`,
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
      <TouchableOpacity onPress={() => alert(item.description)}>
        <Text style={{...styles.text, fontWeight: 'bold', fontSize: 15, color: '#fff'}}>{ item.name }</Text>
        <Text numberOfLines={1} style={{...styles.text, fontStyle: 'italic', fontSize: 12, color: '#fff'}}>{ item.description }</Text>
        <Text style={{...styles.text, fontSize: 12, color: '#fff'}}>Rp <FormattedNumber
          value={item.price}
          minimumFractionDigits={2}
          style={{ color: '#fff' }} /></Text>
      </TouchableOpacity>
      { this.props.orders.some((_item) => { return _item.name == item.name}) ? (
        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
        <Text style={{...styles.text, fontSize: 12, color: '#fff'}}>Jumlah pesanan: </Text>
        <Button
          onPress={() => this._addOrder(item) }
          title="SUDAH ORDER"
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
      id_order: this.props.navigation.state.params.order,
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
        this.props.editOrder(this.props.orders)
        already = true
      }
    }
    if (!already) {
      this.setState({
        subtotal: this.state.subtotal + newOrder.price
      })
      this.props.orders.push(newOrder)
      this.props.editOrder(this.props.orders)
    }
  }

  _clearOrder () {
    this.props.emptyOrder()
  }

  _goNext () {
    this.props.navigation.goBack()
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
      this.setState({
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
          <View style={{ width: width, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginBottom: 10, marginTop: 10 }}>
          <Button
            onPress={() => this._goNext() }
            title="KEMBALI"
            backgroundColor="darkblue"
            color="#fff"
            fontWeight="bold"
            icon={{name: 'backspace'}}
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
          <View style={styles.listContainer}>
            <Text style={{...styles.text, marginLeft: 20, fontSize: 15}}>Daftar Menu</Text>
            <FlatList
              data={this.props.menu.menus}
              renderItem={this._allMenu}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30, marginLeft: 0.05 * width}}
            />
          </View>
          <View style={{ width: width, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginBottom: 10, marginTop: 10 }}>
          <Button
            onPress={() => this._goNext() }
            title="KEMBALI"
            backgroundColor="darkblue"
            color="#fff"
            fontWeight="bold"
            icon={{name: 'backspace'}}
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
    orders: state.order.editedOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editOrder: (orders) => dispatch(editOrder(orders)),
    emptyEdit: () => dispatch(emptyEdit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSelection)