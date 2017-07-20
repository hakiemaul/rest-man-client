import React from 'react'
import { Button, Form,Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { addAction } from '../actions/addAction'

class UserEdit extends React.Component {

  constructor(){
    super()
    this.state = {name:'',category:''}
  }

  handleSubmit(e){
    e.preventDefault()
    var add_to = 'menu'
    this.props.addMenu(this.state,add_to)
    this.props.history.push('/users');
  }

  handleChange(e,type){
    if(type==='name'){

      this.setState({name:e.target.value})
    }else if(type==='category'){

      this.setState({category:e.target.value})
    }else {
      console.log('error');
    }
  }

  render(){
    return (
      <div>
      <Header as='h3'>Edit User</Header>
        <div>
          <Form onSubmit={(e)=>this.handleSubmit(e)}>
            <Form.Field >
              <label>Name</label>
              <input onChange={(e) => { this.handleChange(e,'name') }} value={this.state.name} placeholder='Name' />
            </Form.Field>
            <Form.Field>
              <label>category</label>
              <input onChange={(e) => { this.handleChange(e,'category') }} value = { this.state.category } placeholder='category' />
            </Form.Field>
                <Button type='submit'>Simpan</Button>
          </Form>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    addMenu: (data,add_to) => dispatch(addAction(data,add_to))
  }
}


export default connect (null,mapDispatchToProps)(UserEdit)
