import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
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
  }
}

class CashierDashboard extends React.Component {
  constructor () {
    super ()
    this.state = {
      username: ''
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result)
      this.setState({
        username: user.username
      })
    })
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

export default connect(mapStateToProps, null)(CashierDashboard)