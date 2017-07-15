import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

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

      <Form onSubmit={(e)=>this.handleSubmit(e)}>
        <Form.Field >
          <label>Username</label>
          <input onChange={(e) => { this.handleChange(e,'username') }} value={this.state.username} placeholder='Name' />
        </Form.Field>
        <Form.Field>
          <label>Role</label>
          <input onChange={(e) => { this.handleChange(e,'role') }} value = { this.state.role} placeholder='category' />
        </Form.Field>
            <Button type='submit'>Submit</Button>
      </Form>

    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    addUser: (data,add_to) => dispatch(addAction(data,'users'))
  }
}


export default connect (null,mapDispatchToProps)(UserAdd)
