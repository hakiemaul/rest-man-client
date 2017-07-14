import React from 'react'

import DashBoard from './DashBoard'

import MenuBody from './MenuBody'
import MenuAdd from './MenuAdd'

import UserBody from './UserBody'
import UserAdd from './UserAdd'

import SettingBody from './SettingBody'

import Page404 from './Page404'

import { Switch, Route } from 'react-router-dom'

export default () => {
  return(
      <main>
        <Switch>
          <Route exact path='/' component = { DashBoard }/>
          <Route exact path='/menu' component ={ MenuBody }/>
          <Route path='/menu/add/' component ={ MenuAdd }/>
          <Route exact path='/users' component ={ UserBody }/>
          <Route path='/users/add' component ={ UserAdd }/>
          <Route path='/settings' component ={ SettingBody }/>
          <Route component={Page404}/>
        </Switch>
      </main>
  )
}
