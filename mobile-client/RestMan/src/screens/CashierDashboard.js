import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, DrawerNavigator } from 'react-navigation'

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 300
  },
  text: {
    color: '#020d19',
    fontSize: 20
  }
}

class CashierDashboard extends React.Component {
  static navigationOptions = {
    title: 'Halaman Kasir',
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
      username: '',
      refreshing: false,
      occupied: []
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
    <Image source={require('../assets/occupied.jpg')} style={{ width: 300, borderRadius: 30, height: 82, marginBottom: 10, opacity: 0.7, backgroundColor: 'transparent' }}>
    <TouchableOpacity
      style={{ padding: 20, backgroundColor: '#253951' }}
      onPress={() => this.props.navigation.navigate('Transaction', { name: item.name, order: item.order })}>
      <Text style={{...styles.text, color: '#fff'}}>{item.name}</Text>
      <Text style={{...styles.text, fontSize: 10, color: '#fff' }}>Klik untuk menuju pembayaran</Text>
    </TouchableOpacity>
    </Image>
  )

  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'space-around', alignItems: 'center'}}>
        <Text style={{...styles.text, marginTop: 20, marginBottom: 20}}>Selamat bekerja, {this.state.username}</Text>
        <View style={styles.listContainer}>
          <Text style={styles.text}>Order Aktif</Text>
          {(this.state.occupied.length > 0) ? (<FlatList
            data={this.state.occupied}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item.name}
            style={{ marginTop: 30, width: 300, marginBottom: 50 }}
          />) : (<Text style={{...styles.text, fontSize: 12}}>Tidak ada pesanan</Text>)}
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

export default connect(mapStateToProps, null)(CashierDashboard)