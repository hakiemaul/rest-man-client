import React from 'react'
import { StackNavigator } from 'react-navigation'

import Loading from './screens/Loading'
import Login from './screens/Login'
import WaiterDashboard from './screens/WaiterDashboard'
import MenuSelection from './screens/MenuSelection'
import CashierDashboard from './screens/CashierDashboard'
import Transaction from './screens/Transaction'
import Checkout from './screens/Checkout'

export default App = StackNavigator({
  Loading: { screen: Loading },
  Login: { screen: Login },
  WaiterDashboard: { screen: WaiterDashboard },
  MenuSelection: { screen: MenuSelection },
  Checkout: { screen: Checkout },
  CashierDashboard: { screen: CashierDashboard },
  Transaction: { screen: Transaction }
})