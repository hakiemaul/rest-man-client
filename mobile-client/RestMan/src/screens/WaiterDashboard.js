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
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FC7100'
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
    color: '#FFF',
    fontSize: 20
  }
}

class WaiterDashboard extends React.Component {
  static navigationOptions = {
    title: 'Halaman Waiter'
  }

  constructor () {
    super ()
    this.state = {
      username: '',
      occupied: []
    }
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ width: 300, borderWidth: 1, borderRadius: 10, padding: 20, marginBottom: 10, backgroundColor: '#443C35' }}
      onPress={() => alert('Ini harusnya ke detail' + item.name)}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={{...styles.text, fontSize: 10 }}>Klik untuk lihat detail dan edit</Text>
    </TouchableOpacity>
  )

  _renderFree = ({ item }) => (
    <TouchableOpacity
      style={{ width: 300, borderWidth: 1, borderRadius: 10, padding: 20, marginBottom: 10, backgroundColor: '#443C35' }}
      onPress={() => this._addOrder(item.name)}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={{...styles.text, fontSize: 10 }}>Klik untuk mulai pesanan</Text>
    </TouchableOpacity>
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
        <View style={{...styles.listContainer, marginBottom: 10}}>
          <Text style={styles.text}>Belum Order</Text>
          <FlatList
            data={this.state.free}
            renderItem={this._renderFree}
            keyExtractor={(item, index) => item.name}
            style={{marginBottom: 30, marginTop: 30}}
          />
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.text}>Order Aktif</Text>
          <FlatList
            data={this.state.occupied}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item.name}
            style={{marginBottom: 30, marginTop: 30}}
          />
        </View>
        <Button
          onPress={() => this._doLogout() }
          title="Logout"
          color="red"
          accessibilityLabel="Do your job!"
        />
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