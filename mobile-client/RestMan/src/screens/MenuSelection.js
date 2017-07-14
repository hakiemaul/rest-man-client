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
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#4EA384',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  card: {
    height: 100,
    width: cardWidth,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 6,
    padding: 20,
    marginBottom: 30
  }
}

class MenuSelection extends React.Component {
  constructor () {
    super ()
    this.state = {
      searchMenu: '',
      filtered: [],
      table: '',
      language: 'Indonesia'
    }
  }

  _filteredMenu = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => alert(item.price)}>
        <Text>{ item.name }</Text>
        <Text>{ item.description }</Text>
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
        <Text>{ item.name }</Text>
        <Text>{ item.qty }</Text>
        <Text>{ item.price }</Text>
        <Text>{ item.key }</Text>
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
        alert('Jumlah dipesan: ' + this.props.orders[i].qty)
        already = true
      }
    }
    if (!already) {
      this.props.orders.push(newOrder)
      alert('Jumlah dipesan: 1')
    }
  }

  _doneOrdering () {
    // AXIOS ACTION CREATE MENU-ORDER
    Alert.alert( 'Konfirmasi Pesanan', 'Apakah pelanggan sudah selesai memesan?', [  {text: 'Cancel', onPress: () => {}, style: 'cancel'}, {text: 'OK', onPress: () => {
      this.props.tableIsOrdering('Meja 2')
    }}, ], { cancelable: false } )
  }

  render () {
    if (this.state.searchMenu.length > 0) {
      return (
        <View style={styles.container}>
          <Text>Yeay masuk</Text>
          <Picker
            selectedValue='njksandjknaskj'
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <TextInput
            onChangeText={(text) => this._searchReal(text)}
            value={ this.state.searchMenu }
            style={{ width: 300 }}
            placeholder='Nama menu'
          />
          <View style={styles.listContainer}>
            <Text>Hasil pencarian menu</Text>
            <FlatList
              data={this.state.filtered}
              renderItem={this._filteredMenu}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30}}
            />
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>Yeay masuk</Text>
          <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <TextInput
            onChangeText={(text) => this._searchReal(text)}
            value={ this.state.searchMenu }
            style={{ width: 300 }}
            placeholder='Nama menu'
          />
          <View style={styles.listContainer}>
            <Text>Menu yang sudah dipesan</Text>
            <FlatList
              data={this.props.orders}
              renderItem={this._renderOrder}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30}}
            />
          </View>
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
    orders: state.order.orders
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