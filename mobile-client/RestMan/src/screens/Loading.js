import React from 'react'
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { NavigationActions } from 'react-navigation'

import { getTables, getMenus } from '../actions'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#020d19'
  }
}

class Loading extends React.Component {
  static navigationOptions = {
    header: null,
  }

  componentDidMount () {
    this.props.getTables()
    this.props.getMenus()
    AsyncStorage.getItem('token', (err, result) => {
      if (result === null) {
        const goLogin = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]
        })
        setTimeout( () => {
          this.props.navigation.dispatch(goLogin)
        },1000)
      } else {
        AsyncStorage.getItem('user', (err, result) => {
          let user = JSON.parse(result)
          if (user.role === 'waiters') {
            const goWaiter = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'MainWaiter'})
              ]
            })
            setTimeout( () => {
              this.props.navigation.dispatch(goWaiter)
            },4000)
          } else if (user.role === 'cashier') {
            const goCashier = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'MainCashier'})
              ]
            })
            setTimeout( () => {
              this.props.navigation.dispatch(goCashier)
            },4000)
          }
        })
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 240, height: 255}}
          source={{uri: 'https://00e9e64bac702313a2b47e57885fecd0e0f80d453690dde4a1-apidata.googleusercontent.com/download/storage/v1/b/rest-man-bucket/o/image2.png?qk=AD5uMEuc0PcI95Z34cSy3DzV0e-PGVlFi7sJUHuHPpiaE-NJQzdt8GtOEBUp8Q6eWMBbbtUg69_3OnwR20DdzBmLgu1BMg1wFMGx6W2TIY1_2JikDhV55De0_8ynWDRZSyl_xVd0dGFmQKZtzvGrdSpNlVOSg71K5NFulzSeghGapLJZi1MVbjZKsGDHm9ATaCaQtIb0pYvxzuZ-uebmBJxvnTMMLRNtI-u3XC-FIXOic1kebS4SiehyOpnmGHF6R5Bm9fh_TWuDSRTOwBkq2Xzje2PU3oFwCmhDXXRWBkqs5-XYXQX16MN-BToKizahaOK9YGTqjYOpPdvGJkwo6z2daUOZZZkGQgvrVtaBibatNFN5js78aTmtsmrQCOi_nTBZSYYSJzBVjdclc8l97WBWdjsuK1nZ6W8OHU-wzm_JalXCvyWONxRgMLTuWbVUI7bHYK8ECWJjKlJ1hZKQpbtyi2B1Wr6PIo82uJ2ia4AUTp7wG2jqtxDE59GoqV24X9rfFb8PN7tNWAH3Lkb9sbHCCFBLMVWV7-YQVrJ2J2fxJrG9FXmAuKJQpujNwhEXDLCxdsh7PnUa7QIgCTthXYOoEsn5YVk5ZfX_edLracUpbjoItBSiiqJCcdWlClh3xhS024lBdJSonzhsitRBzGZT2a3w5KBpwGo1C-aXBGJlwWMYWDzBM4oY168OO39b_UowksmTTf-bGSj0D6kUivJEQgw5KugqXEdLuh3d_WrUg-CpPEvV6ADLBAJ4FKvYFuGlo-UarSMVD6sBld3XdaVPSprsDnnTng'}}
        />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTables: () => dispatch(getTables()),
    getMenus: () => dispatch(getMenus())
  }
}

export default connect(null, mapDispatchToProps)(Loading)