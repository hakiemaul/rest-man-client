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
  constructor () {
    super ()
    this.state = {
      id: '',
      orders: [],
      total: 0,
      pay: 0,
      change: 0
    }
  }

  componentDidMount () {
    axios.get(serv + '/order/' + this.props.navigation.state.params.order)
    .then(response => {
      this.props.editOrder(response.data.Menus)
      this.setState({
        id: response.data.id,
        orders: response.data.Menus,
        total: response.data.total_price,
        change: -response.data.total_price
      })
    })
  }

  _addQty (item, index) {
    let edited = this.props.edited.map((d, i) => {
      if (index === i) {
        d.MenuOrder.qty_item++
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
        d.MenuOrder.qty_item--
      }
      return d
    })
    let changed2 = this.props.edited.filter((d) => {
      return d.MenuOrder.qty_item >= 0
    })
    // alert(JSON.stringify(changed2))
    let total = this.state.total - this.props.edited[index].price
    this.props.editOrder(changed2)
    this.setState({
      total: total
    })
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
              onPress={() => this._doneOrdering()}
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
        <Card title="ITEMS" containerStyle={{padding: 20}} >
        {
          this.props.edited.map((u, i) => {
            return (
              <View key={i} style={{paddingBottom: 20, paddingTop: 20, borderBottomWidth: 0.5, borderColor: '#e1e8ee'}}>
                <View style={styles.user}>
                  <View>
                    <Text style={styles.name}>{u.name}</Text>
                    <Text style={styles.price}>{u.name}</Text>
                  </View>
                  <Text style={styles.price}>Rp <FormattedNumber
                    value={u.price}
                    minimumFractionDigits={2} /></Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {u.MenuOrder.qty_item > 0 ? (
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
                  <Text style={{marginLeft: 10, marginRight: 10}}>{u.MenuOrder.qty_item}</Text>
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
          title='TAMBAH ORDER'
          onPress={() => this.props.navigation.goBack()}
          backgroundColor='#2fad4c' />
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