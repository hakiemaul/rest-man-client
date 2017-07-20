import React from 'react'
import { Button, Form,Breadcrumb,Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadAction } from '../actions/loadAction'
import { editAction } from '../actions/editAction'

const kat = [{ text: 'Makanan',value:1,},
             { text: 'Minuman', value:2}]

class MenuEdit extends React.Component {

  constructor(){
    super()
    this.state = {name:'',category:'',price:''}
  }

  componentDidMount(){
    this.props.loadMenu('menu')
  }


  handleSubmit(e){
    e.preventDefault()
    var add_to = 'menu'
    this.props.editMenu(this.state,add_to)
    this.props.history.push('/menu');

  }

  onImageDrop(files){
    this.setState({
      uploadedFile: files[0]
    });
  }

  handleChange(e,type){
    if(type==='name')
      this.setState({name:e.target.value})
    else if(type==='price')
      this.setState({price:+e.target.value})

    console.log(this.state);
  }

  handleChangeDropDown(e,data){
    console.log(data);
      this.setState({category:data.value})
  }

  render(){
    console.log(this.props);
    if(this.props.menu[0])
    // console.log(this.props.menu.filter(data => (data.id===+this.props.match.params.id)))

    return (
      <div>
      <Breadcrumb size='big'>
        <Link to={{pathname:`/menu`}}>
          <Breadcrumb.Section link>Menu</Breadcrumb.Section>
        </Link>
        <Breadcrumb.Divider icon='right chevron' />
        <Breadcrumb.Section active>Edit</Breadcrumb.Section>
      </Breadcrumb>
        <div style={{marginTop:20}}>
          <Form onSubmit={(e)=>this.handleSubmit(e)}>
            <Form.Field >
              <label>Name</label>
              <input onChange={(e) => { this.handleChange(e,'name') }} value={this.state.name} type='text' placeholder='Name' />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <Dropdown onChange={(e,data) => { this.handleChangeDropDown(e,data) }} value={this.state.category} placeholder='Category' fluid selection options={kat} />
            </Form.Field>
            <Form.Field >
              <label>Harga</label>
              <input onChange={(e) => { this.handleChange(e,'price') }} value={+this.state.price} type='number' step='10000' placeholder='harga' />
            </Form.Field>
                <Button type='submit'>Save</Button>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    menu: state.menuReducer.menu
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadMenu: (type) => dispatch(loadAction(type)),
    editMenu: (data,add_to) => dispatch(editAction(data,add_to))
  }
}


export default connect (mapStateToProps,mapDispatchToProps)(MenuEdit)
