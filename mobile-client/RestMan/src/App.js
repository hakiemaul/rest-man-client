import React from 'react'
import { StackNavigator } from 'react-navigation'

import Login from './screens/Login'
import WaiterDashboard from './screens/WaiterDashboard'

export default App = StackNavigator({
  Login: { screen: Login },
  WaiterDashboard: { screen: WaiterDashboard }
})