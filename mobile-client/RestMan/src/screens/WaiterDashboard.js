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
      onPress={() => alert(item.name)}>
      <Text style={styles.text}>Order {item.name}</Text>
      <Text style={{...styles.text, fontSize: 10 }}>Klik untuk lihat detail dan edit</Text>
    </TouchableOpacity>
  )

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

  _addOrder () {
    // AXIOS CREATE ORDER
    this.props.navigation.navigate('MenuSelection')
  }

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
            style={{marginBottom: 30, marginTop: 30}}
          />
          <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableHighlight
              style={ styles.imageContainer2 }
              onPress={() => this._addOrder()}>
              <Image style={ styles.image } source={{ uri: 'https://cdn4.iconfinder.com/data/icons/vectory-bonus-3/40/button_add-512.png' }} />
            </TouchableHighlight>
          </View>
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