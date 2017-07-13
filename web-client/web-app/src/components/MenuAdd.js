import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class MenuAdd extends React.component {

  constructor(){
    super()
    this.state = {name:'',category:''}
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(e);
  }

  handleChange(){

  }

  render(){
    return (
      <Form onSubmit={(e)=>this.addData(e)}>
        <Form.Field >
          <label>Name</label>
          <input onChange={(e) => { this.handleChange(e,'name') }} placeholder='Name' />
        </Form.Field>
        <Form.Field>
          <label>category</label>
          <input placeholder='category' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}
