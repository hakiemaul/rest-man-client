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
  Modal
} from 'react-native'
import { connect } from 'react-redux'

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
      filtered: []
    }
  }

  _filteredMenu = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => alert(item.price)}>
        <Text>{ item.name }</Text>
        <Text>{ item.description }</Text>
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

  render () {
    if (this.state.filtered.length > 0) {
      return (
        <View style={styles.container}>
          <Text>Yeay masuk</Text>
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
          <TextInput
            onChangeText={(text) => this._searchReal(text)}
            value={ this.state.searchMenu }
            style={{ width: 300 }}
            placeholder='Nama menu'
          />
          <View style={styles.listContainer}>
            <Text>Menu yang sudah dipesan</Text>
            <FlatList
              data={this.state.filtered}
              renderItem={this._filteredMenu}
              keyExtractor={(item, index) => item.name}
              style={{marginTop: 30}}
            />
          </View>
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu
  }
}

export default connect(mapStateToProps, null)(MenuSelection)