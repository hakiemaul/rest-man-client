import React from 'react'
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Image,
  AsyncStorage,
  Button,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
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
    marginBottom: 50
  },
  text: {
    color: '#020d19',
    fontSize: 20
  }
}

class WaiterDashboard extends React.Component {
  static navigationOptions = {
    title: 'Halaman Waiter',
    headerTitleStyle: {
      color: '#fff'
    },
    headerStyle: {
      backgroundColor: '#253951'
    }
  }

  constructor () {
    super ()
    this.state = {
      username: ''
    }
  }

  _renderItem = ({ item }) => (
    <Image source={require('../assets/occupied.jpg')} style={{ width: 300, borderRadius: 30, height: 82, marginBottom: 10, opacity: 0.7, backgroundColor: 'transparent' }}>
    <TouchableOpacity
      style={{ padding: 20, backgroundColor: '#253951' }}
      onPress={() => this.props.navigation.navigate('Detail', { name: item.name, order: item.order })}>
      <Text style={{...styles.text, color: '#fff'}}>{item.name}</Text>
      <Text style={{...styles.text, fontSize: 10, color: '#fff' }}>Klik untuk lihat detail dan edit</Text>
    </TouchableOpacity>
    </Image>
  )

  _renderFree = ({ item }) => (
    <Image source={require('../assets/free.jpg')} style={{ width: 300, borderRadius: 30, height: 82, marginBottom: 10, opacity: 0.7, backgroundColor: 'transparent' }}>
    <TouchableOpacity
      style={{ padding: 20, backgroundColor: '#253951' }}
      onPress={() => this._addOrder(item.name)}>
      <Text style={{...styles.text, color: '#fff', opacity: 1}}>{item.name}</Text>
      <Text style={{...styles.text, fontSize: 10, color: '#fff', opacity: 1 }}>Klik untuk mulai pesanan</Text>
    </TouchableOpacity>
    </Image>
  )

  componentWillMount () {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result)
      this.setState({
        username: user.username
      })
      var occupied = []
      var free = []
      for (let key in this.props.table.tables) {
        this.props.table.tables[key].status === true ? occupied.push(this.props.table.tables[key]) : free.push(this.props.table.tables[key])
      }
      this.setState({
        occupied: occupied,
        free: free
      })
    })
  }

  componentWillReceiveProps () {
    setTimeout(() => {
      var occupied = []
      var free = []
      for (let key in this.props.table.tables) {
        this.props.table.tables[key].status === true ? occupied.push(this.props.table.tables[key]) : free.push(this.props.table.tables[key])
      }
      this.setState({
        occupied: occupied,
        free: free
      })
    }, 3000)
  }

  _doLogout () {
    AsyncStorage.removeItem('token', (err, result) => {
      this.setState({
        token: ''
      })
      AsyncStorage.removeItem('user', (err, result) => {
        this.setState({
          username: ''
        })
        const goLogin = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]
        })
        this.props.navigation.dispatch(goLogin)
      })
    })
  }

  _addOrder (table) {
    // AXIOS CREATE ORDER
    this.props.navigation.navigate('MenuSelection', { table: table })
  }

  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'space-around', alignItems: 'center'}}>
        <Text style={{...styles.text, marginTop: 20, marginBottom: 20}}>Selamat bekerja, {this.state.username}</Text>
        <View style={{...styles.listContainer, marginBottom: 50, width: 300 }}>
          <Text style={styles.text}>Belum Pesan</Text>
          {(this.state.free) ? ((this.state.free.length > 0) ? (<FlatList
            data={this.state.free}
            renderItem={this._renderFree}
            keyExtractor={(item, index) => item.name}
            style={{ marginTop: 30}}
          />) : (<Text style={{...styles.text, fontSize: 12}}>Semua meja telah memesan</Text>)) : (<ActivityIndicator size='large' />)}
        </View>
        <View style={{...styles.listContainer, marginBottom: 50, width: 300}}>
          <Text style={styles.text}>Sudah Pesan</Text>
          {(this.state.occupied) ? ((this.state.occupied.length > 0) ? (<FlatList
            data={this.state.occupied}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item.name}
            style={{ marginTop: 30}}
          />) : ((<Text style={{...styles.text, fontSize: 12}}>Tidak ada pesanan</Text>))) : (<ActivityIndicator size='large' />)}
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    table: state.table
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTables: () => dispatch(getTables())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaiterDashboard)