import React, { Component } from 'react'
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


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
      <div >
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={this.state.tes} icon='labeled' vertical inverted>
            <Link to={{pathname:'/'}}>
              <Menu.Item name='Dasboard'>
                <Icon name='home' />
                Dasboard
              </Menu.Item>
            </Link>

            <Link to={{pathname:'/menu'}}>
              <Menu.Item name='User'>
                <Icon name='users' />
                Employees
              </Menu.Item>
            </Link>

            <Link to={{pathname:'/menu'}}>
              <Menu.Item name='Food'>
                <Icon name='food' />
                Menu
              </Menu.Item>
            </Link>

            <Link to={{pathname:'/menu'}}>
              <Menu.Item name='Settings'>
                <Icon name='settings' />
                Settings
              </Menu.Item>
            </Link>

          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic style={{display:'flex',width:'89%',height:500}}>
                <ContentBody />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftPush
