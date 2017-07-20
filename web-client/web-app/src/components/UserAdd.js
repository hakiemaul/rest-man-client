import React from 'react'
import { Button, Form,Breadcrumb,Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addAction } from '../actions/addAction'

const kat = [{ text: 'Admin',value:1,},
             { text: 'waiters', value:2},
             { text: 'cashier', value:3}]

class UserAdd extends React.Component {

  constructor(){
    super()
    this.state = {username:'',role:''}
  }

  handleSubmit(e){
    e.preventDefault()
    var add_to = 'users'
    this.props.addUser(this.state,add_to)
    this.props.history.push('/users');
  }

  handleChange = (e) => this.setState({username:e.target.value})
  handleChangeDropDown= (data) => this.setState({role:data.value})

  render(){
    return (
      <div>
      <Breadcrumb size='big'>
        <Link to={{pathname:`/users`}}>
          <Breadcrumb.Section link>Users</Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider icon='right chevron' />
        <Breadcrumb.Section active>Add</Breadcrumb.Section>
      </Breadcrumb>
        <div style={{marginTop:20}}>
          <Form onSubmit={(e)=>this.handleSubmit(e)}>
            <Form.Field >
              <label>Name</label>
              <input required onChange={(e) => { this.handleChange(e,'name') }} value={this.state.name} placeholder='Name' />
            </Form.Field>
              <Form.Field>
                <label>Role</label>
                <Dropdown onChange={(e,data) => { this.handleChangeDropDown(data) }} value={this.state.role} placeholder='Role' fluid selection options={kat} />
              </Form.Field>
                <Button type='submit'>Add</Button>
          </Form>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    addUser: (data,add_to) => dispatch(addAction(data,'users'))
  }
}


export default connect (null,mapDispatchToProps)(UserAdd)
