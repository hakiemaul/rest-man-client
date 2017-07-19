import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import Loading from './screens/Loading'
import Login from './screens/Login'
import WaiterDashboard from './screens/WaiterDashboard'
import MenuSelection from './screens/MenuSelection'
import CashierDashboard from './screens/CashierDashboard'
import Transaction from './screens/Transaction'
import Checkout from './screens/Checkout'
import Logout from './screens/Logout'
import Detail from './screens/Detail'
import EditMenu from './screens/EditMenu'

const MainCashier = DrawerNavigator({
  CashierDashboard: { screen: CashierDashboard },
  Logout: { screen: Logout }
}, {
  initialRouteName: 'CashierDashboard',
  headerMode: 'screen'
})

const MainWaiter = DrawerNavigator({
  WaiterDashboard: { screen: WaiterDashboard },
  Logout: { screen: Logout }
}, {
  initialRouteName: 'WaiterDashboard',
  headerMode: 'screen'
})

export default App = StackNavigator({
  Loading: { screen: Loading },
  Login: { screen: Login },
  WaiterDashboard: { screen: WaiterDashboard },
  MenuSelection: { screen: MenuSelection },
  Checkout: { screen: Checkout },
  CashierDashboard: { screen: CashierDashboard },
  Transaction: { screen: Transaction },
  MainCashier: { screen: MainCashier },
  MainWaiter: { screen: MainWaiter },
  Detail: { screen: Detail },
  EditMenu: { screen: EditMenu }
})