import React from 'react'
import { Button,Message,Icon, Form,Segment,Header } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Login extends React.Component {

  constructor(){
    super()
    this.state = {
      username:'',
      password:'',
      error:false
    }
  }


  handleSubmit(e){

    axios.post('http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000/auth/login',this.state)
    .then(response => {
      if(response.data.token){
        this.props.history.push('/');
      }else {
        this.setState({error:true})
        this.props.history.push('/login');
      }
    })


  }

  handleChange(e,type){
    if(type==='username')
      this.setState({username:e.target.value})
    else this.setState({password:e.target.value})
  }

  render(){
    return(
      <div style={{marginLeft:'40%',marginRight:'40%',marginTop:'15%',marginBottom:'10%'}}>
        <Segment>
           <Header as='h2'>LOGIN</Header>
          {(this.state.error)? <Message attached='bottom' warning>
            <Icon name='exclamation' />
            Access Denied
          </Message>:null}
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Field>
              <label>Username</label>
              <input onChange={(e) => this.handleChange(e,'username')} placeholder='Username' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input onChange={(e) => this.handleChange(e,'password')} type='password' placeholder='Password' />
            </Form.Field>
            <Button type='submit'>Login</Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

export default Login
