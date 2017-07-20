import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class Login extends React.Component {

  constructor(){
    super()
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type='password' placeholder='Password' />
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    )
  }
}

export default Login
