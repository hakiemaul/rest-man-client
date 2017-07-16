import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FC7100',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  text: {
    color: '#FFF',
    fontSize: 20
  }
}

class CashierDashboard extends React.Component {
  static navigationOptions = {
    title: 'Halaman Kasir'
  }

  constructor () {
    super ()
    this.state = {
      username: '',
      refreshing: false,
    }
  }

  componentDidMount () {
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
  }

  componentWillReceiveProps () {
    setTimeout(() => {
      var occupied = []
      for (let key in this.props.table.tables) {
        this.props.table.tables[key].status === true ? occupied.push(this.props.table.tables[key]) : occupied
      }
      this.setState({
        occupied: occupied
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

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ width: 300, borderWidth: 1, borderRadius: 10, padding: 20, marginBottom: 10, backgroundColor: '#443C35' }}
      onPress={() => this.props.navigation.navigate('Transaction', { name: item.name })}>
      <Text style={styles.text}>Order {item.name}</Text>
      <Text style={{...styles.text, fontSize: 10 }}>Klik untuk menuju pembayaran</Text>
    </TouchableOpacity>
  )

  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'space-around', alignItems: 'center'}}>
        <Text style={{...styles.text, marginTop: 20, marginBottom: 20}}>Selamat bekerja, {this.state.username}</Text>
        <View style={styles.listContainer}>
          <Text style={styles.text}>Order Aktif</Text>
          <FlatList
            data={this.state.occupied}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item.name}
            style={{ marginTop: 30, width: 300, marginBottom: 50 }}
          />
        </View>
        <Button
          onPress={() => this._doLogout() }
          title="Logout"
          color="#443C35"
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

export default connect(mapStateToProps, null)(CashierDashboard)