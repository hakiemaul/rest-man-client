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
  Button
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

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
      token: '',
      username: '',
      occupied: []
    }
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ width: 300 }}
      onPress={() => alert(item.key)}>
      <Text style={{ fontSize: 20 }}>Order {item.name}</Text>
      <Text style={{ fontSize: 10 }}>Klik untuk lihat detail</Text>
    </TouchableOpacity>
  )

  componentDidMount () {
    AsyncStorage.getItem('token', (err, result) => {
      this.setState({
        token: result
      })
      AsyncStorage.getItem('user', (err, result) => {
        const user = JSON.parse(result)
        this.setState({
          username: user.username
        })
        var occupied = []
        for (let key in this.props.table.tables) {
          this.props.table.tables[key].status === true ? occupied.push(this.props.table.tables[key]) : occupied
        }
        this.setState({
          occupied: occupied
        })
      })
    })
  }

  componentWillReceiveProps () {
    var occupied = []
    // var occupied = Object.keys(this.props.table.tables)
    // var occupied = this.props.table.tables.keys.filter( (obj) => {obj} )
    for (let key in this.props.table.tables) {
      this.props.table.tables[key].status === true ? occupied.push(this.props.table.tables[key]) : occupied
    }
    this.setState({
      occupied: occupied
    })
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

  _addOrder () {
    // AXIOS CREATE ORDER
    this.props.navigation.navigate('MenuSelection')
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Selamat bekerja, {this.state.username}</Text>
        <View style={styles.listContainer}>
          <Text>Order Aktif</Text>
          <FlatList
            data={this.state.occupied}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item.name}
            style={{marginBottom: 30, marginTop: 30}}
          />
          <View style={{alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableHighlight
              style={ styles.imageContainer2 }
              onPress={() => this._addOrder()}>
              <Image style={ styles.image } source={{ uri: 'https://cdn4.iconfinder.com/data/icons/vectory-bonus-3/40/button_add-512.png' }} />
            </TouchableHighlight>
            <Text style={{ fontSize: 30 }}>
              Tambah order
            </Text>
          </View>
          <Button
            onPress={() => this._doLogout() }
            title="Logout"
            color="#841584"
            accessibilityLabel="Do your job!"
          />
        </View>
      </View>
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