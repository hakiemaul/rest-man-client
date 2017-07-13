import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import ContentBody from './ContentBody'

class SidebarLeftPush extends Component {

  constructor(){
    super()
    this.state = { tes:false }
  }

  test(){
    setTimeout(()=>{this.setState({tes:true})},1000)
  }

  render() {
    this.test()
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={this.state.tes} icon='labeled' vertical inverted>
            <Menu.Item name='Dasboard'>
              <Icon name='home' />
              Dasboard
            </Menu.Item>
            <Menu.Item name='User'>
              <Icon name='users' />
              Employees
            </Menu.Item>
            <Menu.Item name='Food'>
              <Icon name='food' />
              Menu
            </Menu.Item>
            <Menu.Item name='Settings'>
              <Icon name='settings' />
              Settings
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <ContentBody />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftPush
