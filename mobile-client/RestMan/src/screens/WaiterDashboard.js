import React from 'react'
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Image,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#4EA384',
  },
  image: {
    height:64,
    width: 64,
    borderRadius: 32
  },
  imageContainer2: {

  },
  listContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }
}

class WaiterDashboard extends React.Component {
  constructor () {
    super ()
    this.state = {
      token: ''
    }
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ width: 300 }}
      onPress={() => alert(item.key)}>
      <Text style={{ fontSize: 20 }}>Order Meja {item.key}</Text>
      <Text style={{ fontSize: 10 }}>Klik untuk lihat detail</Text>
    </TouchableOpacity>
  )

  componentDidMount () {
    AsyncStorage.getItem('token', (err, result) => {
      this.setState({
        token: result
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Selamat bekerja, {this.props.user.username}</Text>
        <View style={styles.listContainer}>
          <Text>Order Aktif</Text>
          <FlatList
            data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}, {key: 'g'}, {key: 'h'}, {key: 'i'}, {key: 'j'}, {key: 'k'}, {key: 'l'}]}
            renderItem={this._renderItem}
            style={{marginBottom: 30, marginTop: 30}}
          />
          <View style={{alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableHighlight
              style={ styles.imageContainer2 }
              onPress={() => this.props.navigation.navigate('MenuSelection')}>
              <Image style={ styles.image } source={{ uri: 'https://cdn4.iconfinder.com/data/icons/vectory-bonus-3/40/button_add-512.png' }} />
            </TouchableHighlight>
            <Text style={{ fontSize: 30 }}>
              Tambah order
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(WaiterDashboard)