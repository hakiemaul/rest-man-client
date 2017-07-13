import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Button
} from 'react-native'
import { connect } from 'react-redux'

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
    <View>
      <Text>{ item.name }</Text>
      <Text>{ item.description }</Text>
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
          <FlatList
            data={this.state.filtered}
            renderItem={this._filteredMenu}
            keyExtractor={(item, index) => item.name}
            style={{marginTop: 30}}
          />
        </View>
        <Button
          onPress={() => alert(JSON.stringify(this.props.menu.menus[0]))}
          title='tes' />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu
  }
}

export default connect(mapStateToProps, null)(MenuSelection)