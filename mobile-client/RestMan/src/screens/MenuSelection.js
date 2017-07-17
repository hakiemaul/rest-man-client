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
  Picker
} from 'react-native'
import { connect } from 'react-redux'

import { addOrder, isOrdering, tableIsOrdering } from '../actions'

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
  constructor () {
    super ()
    this.state = {
      searchMenu: '',
      filtered: [],
      table: null,
      free: [],
      subtotal: 0
    }
  }

  _filteredMenu = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => alert(item.price)}>
        <Text style={{...styles.text, fontWeight: 'bold', fontSize: 15}}>{ item.name }</Text>
        <Text style={{...styles.text, fontStyle: 'italic', fontSize: 12}}>{ item.description }</Text>
      </TouchableOpacity>
      <Button
        onPress={() => this._addOrder(item) }
        title="Add to Order"
        color="#841584"
        accessibilityLabel="Do your job!"
      />
    </View>
  )

  _renderOrder = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => alert(item.price)}>
        <Text style={{...styles.text, fontWeight: 'bold', fontSize: 15}}>{ item.name }</Text>
        <Text style={{...styles.text, fontSize: 12}}>Qty: { item.qty }</Text>
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
      qty: 1
    }
    let already = false
    for (let i = 0; i < this.props.orders.length; i++) {
      if (this.props.orders[i].name === newOrder.name) {
        this.props.orders[i].qty += 1
        this.state.subtotal += this.props.orders[i].price
        alert('Jumlah dipesan: ' + this.props.orders[i].qty)
        already = true
      }
    }
    if (!already) {
      this.state.subtotal += newOrder.price
      this.props.orders.push(newOrder)
      alert('Jumlah dipesan: 1')
    }
  }

  _doneOrdering () {
    // AXIOS ACTION CREATE MENU-ORDER
    Alert.alert( 'Konfirmasi Pesanan', 'Apakah pelanggan sudah selesai memesan? Apakah pelanggan sudah selesai memesan? Apakah pelanggan sudah selesai memesan?Apakah pelanggan sudah selesai memesan? Apakah pelanggan sudah selesai memesan? Apakah pelanggan sudah selesai memesan? Apakah pelanggan sudah selesai memesan?', [  {text: 'Cancel', onPress: () => {}, style: 'cancel'}, {text: 'OK', onPress: () => {
      this.props.tableIsOrdering(this.state.table || this.state.free[0].name)
      // alert(this.state.table || this.state.free[0].name)
    }}, ], { cancelable: false } )
  }

  componentDidMount () {
    var free = []
    for (let key in this.props.table.tables) {
      this.props.table.tables[key].status === false ? free.push(this.props.table.tables[key]) : free
    }
    this.setState({
      free: free
    })
  }

  render () {
    if (this.state.searchMenu.length > 0) {
      return (
        <View style={styles.container}>
          <Text style={{...styles.text, marginTop: 20, marginBottom: 20, marginLeft: 20}}>Halaman pemesanan</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...styles.text, fontSize: 15, marginLeft: 20, marginTop: 14, marginRight: 10}}>Nomor Meja</Text>
            <Picker
                style={{width: 100}}
                selectedValue={this.state.free[0].name}
                onValueChange={(tab) => this.setState({table: tab})}
                mode='dropdown'>
              {this.state.free.map(table => (
                <Picker.Item label={table.name} value={table.name} key={table.name} />
              ))}
            </Picker>
          </View>
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
              renderItem={this._filteredMenu}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30, marginLeft: 44}}
            />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={{...styles.text, marginTop: 20, marginBottom: 20, marginLeft: 20}}>Halaman pemesanan</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...styles.text, fontSize: 15, marginLeft: 20, marginTop: 14, marginRight: 10}}>Nomor Meja</Text>
            <Picker
                style={{width: 100}}
                selectedValue={this.state.table}
                onValueChange={(tab) => this.setState({table: tab})}
                mode='dropdown'>
              {this.state.free.map(table => (
                <Picker.Item label={table.name} value={table.name} key={table.name} />
              ))}
            </Picker>
          </View>
          <TextInput
            onChangeText={(text) => this._searchReal(text)}
            value={ this.state.searchMenu }
            style={{ width: 300, marginLeft: 20 }}
            placeholder='Nama menu'
          />
          <View style={styles.listContainer}>
            <Text style={{...styles.text, marginLeft: 20, fontSize: 15}}>Menu yang sudah dipesan</Text>
            <FlatList
              data={this.props.orders}
              renderItem={this._renderOrder}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30, marginLeft: 44}}
            />
          </View>
          <Text style={{...styles.text, margin: 20}}>Subtotal: {this.state.subtotal}</Text>
          <Button
            onPress={() => this._doneOrdering() }
            title="Selesai Memesan"
            color="#841584"
            accessibilityLabel="Do your job!"
          />
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
    tableIsOrdering: (table) => dispatch(tableIsOrdering(table))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSelection)