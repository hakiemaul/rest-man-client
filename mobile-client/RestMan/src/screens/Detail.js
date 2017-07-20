import React from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableHighlight
} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import axios from 'axios'
import { Card, ListItem, Button, Icon, FormInput, FormLabel } from 'react-native-elements'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { FormattedNumber } from 'react-native-globalize'

import { editOrder, emptyEdit } from '../actions'

const serv = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'

const styles = {
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold'
  },
  text: {
    color: '#000',
    fontSize: 20,
    margin: 20
  }
}

class Detail extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `Edit Order ${navigation.state.params.name}`,
    headerTitleStyle: {
      color: '#fff'
    },
    headerStyle: {
      backgroundColor: '#253951'
    },
    headerTintColor: '#fff'
  })

  constructor () {
    super ()
    this.state = {
      orders: [],
      total: 0,
      pay: 0,
      change: 0
    }
  }

  componentDidMount () {
    axios.get(serv + '/order/' + this.props.navigation.state.params.order)
    .then(response => {
      let orders = response.data.Menus.map(order => {
        return {
          id_order: response.data.id,
          id_menu: order.id,
          qty_item: order.MenuOrder.qty_item,
          price: order.price,
          name: order.name,
          description: order.description
        }
      })
      let total = response.data.total_price
      if (this.props.edited.length === 0 || this.props.edited[0].id_order !== orders[0].id_order) {
        this.props.editOrder(orders)
      } else {
        total = this.props.edited.reduce((sum, value) => {
          return sum + (value.price * value.qty_item)
        }, 0)
      }
      this.setState({
        id_employee: response.data.id_employee,
        total: total
      })
    })
  }

  // componentDidFocus () {
  //   this.props.edited = this.props.edited
  // }

  _addQty (item, index) {
    let edited = this.props.edited.map((d, i) => {
      if (index === i) {
        d.qty_item++
      }
      return d
    })
    let total = this.state.total + this.props.edited[index].price
    // alert(edited)
    this.props.editOrder(edited)
    this.setState({
      total: total
    })
  }

  _remQty (item, index) {
    let changed = this.props.edited.map((d, i) => {
      if (index === i) {
        d.qty_item--
      }
      return d
    })
    let changed2 = this.props.edited.filter((d) => {
      return d.qty_item >= 0
    })
    // alert(JSON.stringify(changed2))
    let total = this.state.total - this.props.edited[index].price
    this.props.editOrder(changed2)
    this.setState({
      total: total
    })
  }

  _doneEditing () {
    Alert.alert( 'Konfirmasi Perubahan', 'Apakah pesanan sudah sesuai?', [  {text: 'Cancel', onPress: () => {}, style: 'cancel'}, {text: 'OK', onPress: () => {
      let self = this
      let edited = this.props.edited.filter((d) => {
        return d.qty_item > 0
      })
      axios.put(serv + '/order/' + this.props.navigation.state.params.order, {
        no_meja: this.props.navigation.state.params.name,
        id_employee: this.state.id_employee,
        total_price: this.state.total,
        menu_order: edited
      })
      .then(response => {
        self.props.emptyEdit()
        const goWaiter = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainWaiter'})
          ]
        })
        self.props.navigation.dispatch(goWaiter)
      })
    }}, ], { cancelable: false } )
  }

  _cancelEdit () {
    this.props.emptyEdit()
    const goWaiter = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'MainWaiter'})
      ]
    })
    this.props.navigation.dispatch(goWaiter)
  }

  render () {
    return (
      <ParallaxScrollView
        parallaxHeaderHeight={200}
        backgroundColor='white'
        renderForeground={() => (
          <View style={{ height: 300, flex: 1 }}>
            <Card title="RINGKASAN" containerStyle={{padding: 20}} >
              <View>
                <Text>Subtotal Rp <FormattedNumber
                  value={this.state.total}
                  minimumFractionDigits={2} /></Text>
                <Text></Text>
              </View>
            </Card>
            {(this.state.total > 0) ? (<Button
              raised
              icon={{name: 'shopping-cart'}}
              onPress={() => this._doneEditing()}
              title='KONFIRMASI EDIT'
              backgroundColor='#73a4f4' />) : (<Button
                raised
                disabled
                icon={{name: 'shopping-cart'}}
                onPress={() => this._doneOrdering()}
                title='KONFIRMASI EDIT'
                backgroundColor='#73a4f4' />)}
          </View>
        )}
        renderStickyHeader={() => (
          <View style={{ height: 40, backgroundColor: "#73a4f4", padding: 10 }}>
            <Text style={{ color: '#fff' }}>Subtotal Rp <FormattedNumber
              value={this.state.total}
              minimumFractionDigits={2} /></Text>
          </View>
        )}
        stickyHeaderHeight={40}>
        <Text style={styles.text}>Edit Order {this.props.navigation.state.params.name}</Text>
        <Card title="PESANAN" containerStyle={{padding: 20}} >
        {
          this.props.edited.map((u, i) => {
            return (
              <View key={i} style={{paddingBottom: 20, paddingTop: 20, borderBottomWidth: 0.5, borderColor: '#e1e8ee'}}>
                <View style={styles.user}>
                  <View>
                    <Text style={styles.name}>{u.name}</Text>
                  </View>
                  <Text style={styles.price}>Rp <FormattedNumber
                    value={u.price}
                    minimumFractionDigits={2} /></Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {u.qty_item > 0 ? (
                    <TouchableHighlight style={{width: 30, height: 26, borderWidth: 1, borderRightWidth: 0}}
                      onPress={() => this._remQty(u, i)}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon
                    raised
                    name='remove'
                    color='#43484d'
                    style={10} />
                    </View>
                    </TouchableHighlight>) : (<TouchableHighlight style={{width: 30, height: 26, borderWidth: 1, borderRightWidth: 0, backgroundColor: 'lightgrey', borderColor: 'lightgrey'}}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon
                    raised
                    name='remove'
                    color='#fff'
                    style={10} />
                    </View>
                    </TouchableHighlight>)}
                  <View style={{width: 30, height: 26, borderWidth: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{marginLeft: 10, marginRight: 10}}>{u.qty_item}</Text>
                  </View>
                  <TouchableHighlight style={{width: 30, height: 26, borderWidth: 1, borderLeftWidth: 0}}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon
                      raised
                      name='add'
                      color='#43484d'
                      style={10}
                      onPress={() => this._addQty(u, i)} />
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            );
          })
        }
        </Card>
        <Button
          raised
          icon={{name: 'add'}}
          title='TAMBAH PESANAN'
          onPress={() => this.props.navigation.navigate('EditMenu', { order: this.props.navigation.state.params.order, table: this.props.navigation.state.params.name })}
          backgroundColor='#2fad4c' />
        <View style={{ marginTop: 50, marginBottom: 50}}>
          <Button
          raised
          icon={{name: 'delete'}}
          onPress={() => this._cancelEdit()}
          title='BATAL UBAH'
          backgroundColor='red'
          />
        </View>
      </ParallaxScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    edited: state.order.editedOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editOrder: (orders) => dispatch(editOrder(orders)),
    emptyEdit: () => dispatch(emptyEdit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)