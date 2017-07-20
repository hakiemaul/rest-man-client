import React from 'react'

import DashBoard from './DashBoard'

import MenuBody from './MenuBody'
import MenuAdd from './MenuAdd'
import MenuEdit from './MenuEdit'

import UserBody from './UserBody'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

import ReportBody from './ReportBody'

import SettingBody from './SettingBody'

import Page404 from './Page404'

import { Switch, Route } from 'react-router-dom'

export default () => {
  return(
      <div style={{display:'flex',width:'100%'}}>
        <Switch>
          <Route exact path='/' component = { DashBoard }/>
          <Route exact path='/menu' component ={ MenuBody }/>
          <Route path='/menu/add' component ={ MenuAdd }/>
          <Route path='/menu/edit/:id' component ={ MenuEdit }/>
          <Route exact path='/users' component ={ UserBody }/>
          <Route path='/users/add' component ={ UserAdd }/>
          <Route path='/users/edit/:id' component ={ UserEdit }/>
          <Route exact path='/report' component ={ ReportBody }/>
          <Route path='/settings' component ={ SettingBody }/>
          <Route component={ Page404 }/>
        </Switch>
      </div>
  )
}
