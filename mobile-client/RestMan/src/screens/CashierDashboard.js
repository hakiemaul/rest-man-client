import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-around',
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

class CashierDashboard extends React.Component {
  constructor () {
    super ()
    this.state = {
      username: ''
    }
  }

  componentWillMount () {
    var occupied = []
    for (let key in this.props.table.tables) {
      this.props.table.tables[key].status === true ? occupied.push(this.props.table.tables[key]) : occupied
    }
    this.setState({
      occupied: occupied
    })
  }

  componentDidMount () {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result)
      this.setState({
        username: user.username
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

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ width: 300 }}
      onPress={() => alert(item.key)}>
      <Text style={{ fontSize: 20 }}>Order {item.name}</Text>
      <Text style={{ fontSize: 10 }}>Klik untuk pembayaran</Text>
    </TouchableOpacity>
  )

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
            style={{ marginTop: 30}}
          />
        </View>
        <Button
          onPress={() => this._doLogout() }
          title="Logout"
          color="#841584"
          accessibilityLabel="Do your job!"
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    table: state.table
  }
}

export default connect(mapStateToProps, null)(CashierDashboard)