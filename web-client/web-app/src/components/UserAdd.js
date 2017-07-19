import React from 'react'
import { Button, Form,Breadcrumb } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addAction } from '../actions/addAction'

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

  handleChange(e,type){
    if(type==='username'){

      this.setState({username:e.target.value})
    }else if(type==='role'){

      this.setState({role:e.target.value})
    }else {
      console.log('error');
    }
  }

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
              <input onChange={(e) => { this.handleChange(e,'name') }} value={this.state.name} placeholder='Name' />
            </Form.Field>
            <Form.Field>
              <label>category</label>
              <input onChange={(e) => { this.handleChange(e,'category') }} value = { this.state.category } placeholder='category' />
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
