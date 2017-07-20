import React from 'react'
import { AsyncStorage, Alert, View, Text, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'
import { FormattedWrapper, FormattedNumber } from 'react-native-globalize'

import { addOrder, tableIsOrdering, emptyOrder } from '../actions'

const serv = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'
const styles = {
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 10
  },
  name: {
    fontWeight: 'bold'
  },
  price: {}
}

class Checkout extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor () {
    super ()
    this.state = {
      subtotal: 0,
      id: null,
      isLoading: false
    }
  }

  _addQty (item, index) {
    let edited = this.props.orders.map((d, i) => {
      if (index === i) {
        d.qty_item++
      }
      return d
    })
    let total = this.state.subtotal + this.props.orders[index].price
    // alert(edited)
    this.props.addOrder(edited)
    this.setState({
      subtotal: total
    })
  }

  _remQty (item, index) {
    let edited = this.props.orders.map((d, i) => {
      if (index === i) {
        d.qty_item--
      }
      return d
    })
    let edited2 = this.props.orders.filter((d) => {
      return d.qty_item >= 0
    })
    this.props.addOrder(edited2)
    let total = this.state.subtotal - this.props.orders[index].price
    this.setState({
      subtotal: total
    })
  }

  _doneOrdering () {
    // AXIOS ACTION CREATE MENU-ORDER
    Alert.alert( 'Konfirmasi Pesanan', 'Apakah pelanggan sudah selesai memesan?', [  {text: 'Cancel', onPress: () => {}, style: 'cancel'}, {text: 'OK', onPress: () => {
      this.setState({
        isLoading: true
      })
      let self = this
      let edited = this.props.orders.filter((d) => {
        return d.qty_item > 0
      })
      axios.post(serv + '/order', {
        no_meja: this.props.navigation.state.params.table,
        id_employee: this.state.id,
        total_price: this.state.subtotal,
        menu_order: edited
      })
      .then(response => {
        self.props.tableIsOrdering(self.props.navigation.state.params.table, response.data.id)
        self.props.emptyOrder()
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

  componentDidMount () {
    AsyncStorage.getItem('user', (err, result) => {
      const user = JSON.parse(result)
      let price = this.props.orders.reduce((sum, value) => {
        return sum + (value.price * value.qty_item)
      }, 0)
      this.setState({
        subtotal: price,
        id: user.id
      })
    })
  }

  render () {
    if (!this.state.isLoading) {
      return (
        <ParallaxScrollView
          parallaxHeaderHeight={200}
          backgroundColor='white'
          renderForeground={() => (
            <View style={{ height: 300, flex: 1 }}>
              <Card title="RINGKASAN" containerStyle={{padding: 20}} >
                <View>
                  <Text>Subtotal Rp <FormattedNumber
                    value={this.state.subtotal}
                    minimumFractionDigits={2} /></Text>
                  <Text></Text>
                </View>
              </Card>
              {(this.state.subtotal > 0) ? (<Button
                raised
                icon={{name: 'shopping-cart'}}
                onPress={() => this._doneOrdering()}
                title='SELESAI'
                backgroundColor='#73a4f4' />) : (<Button
                  raised
                  disabled
                  icon={{name: 'shopping-cart'}}
                  onPress={() => this._doneOrdering()}
                  title='SELESAI'
                  backgroundColor='#73a4f4' />)}
            </View>
          )}
          renderStickyHeader={() => (
            <View style={{ height: 40, backgroundColor: "#73a4f4", padding: 10 }}>
              <Text style={{ color: '#fff' }}>Subtotal Rp <FormattedNumber
                value={this.state.subtotal}
                minimumFractionDigits={2} /></Text>
            </View>
          )}
          stickyHeaderHeight={40}>
          <Card title="PESANAN" containerStyle={{padding: 20}} >
          {
            this.props.orders.map((u, i) => {
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
                    {u.qty_item>0 ? (
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
            onPress={() => this.props.navigation.goBack()}
            backgroundColor='#2fad4c' />
        </ParallaxScrollView>
      )
    } else {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
          <Image
            style={{width: 240, height: 255}}
            source={{uri: 'https://00e9e64bac702313a2b47e57885fecd0e0f80d453690dde4a1-apidata.googleusercontent.com/download/storage/v1/b/rest-man-bucket/o/image2.png?qk=AD5uMEuc0PcI95Z34cSy3DzV0e-PGVlFi7sJUHuHPpiaE-NJQzdt8GtOEBUp8Q6eWMBbbtUg69_3OnwR20DdzBmLgu1BMg1wFMGx6W2TIY1_2JikDhV55De0_8ynWDRZSyl_xVd0dGFmQKZtzvGrdSpNlVOSg71K5NFulzSeghGapLJZi1MVbjZKsGDHm9ATaCaQtIb0pYvxzuZ-uebmBJxvnTMMLRNtI-u3XC-FIXOic1kebS4SiehyOpnmGHF6R5Bm9fh_TWuDSRTOwBkq2Xzje2PU3oFwCmhDXXRWBkqs5-XYXQX16MN-BToKizahaOK9YGTqjYOpPdvGJkwo6z2daUOZZZkGQgvrVtaBibatNFN5js78aTmtsmrQCOi_nTBZSYYSJzBVjdclc8l97WBWdjsuK1nZ6W8OHU-wzm_JalXCvyWONxRgMLTuWbVUI7bHYK8ECWJjKlJ1hZKQpbtyi2B1Wr6PIo82uJ2ia4AUTp7wG2jqtxDE59GoqV24X9rfFb8PN7tNWAH3Lkb9sbHCCFBLMVWV7-YQVrJ2J2fxJrG9FXmAuKJQpujNwhEXDLCxdsh7PnUa7QIgCTthXYOoEsn5YVk5ZfX_edLracUpbjoItBSiiqJCcdWlClh3xhS024lBdJSonzhsitRBzGZT2a3w5KBpwGo1C-aXBGJlwWMYWDzBM4oY168OO39b_UowksmTTf-bGSj0D6kUivJEQgw5KugqXEdLuh3d_WrUg-CpPEvV6ADLBAJ4FKvYFuGlo-UarSMVD6sBld3XdaVPSprsDnnTng'}}
          />
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addOrder: (orders) => dispatch(addOrder(orders)),
    tableIsOrdering: (table, order) => dispatch(tableIsOrdering(table, order)),
    emptyOrder: () => dispatch(emptyOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)