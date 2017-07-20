import React from 'react'
import { Table,Breadcrumb,Button,Icon, Menu, Loader,Dimmer } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addAction } from '../actions/addAction'
import { loadAction } from '../actions/loadAction'
import { Link } from 'react-router-dom'

class UserBody extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      activeItem: 1,
      limit:5
    }
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: +name })

  handlePrev = () => this.setState({ activeItem: this.state.activeItem-1 })

  handleNext = () => this.setState({ activeItem: this.state.activeItem+1 })

  handleDelete = (i) => {
    this.setState({ users: this.state.users.filter((data,index) => (index!==i) ? data:null)})
  }

  componentDidMount(){
    this.props.loadUsers('user')
  }

  renderPage(limit){
    const { activeItem } = this.state
    const { users } = this.props
    let arr = users.filter((data,i)=>(data.Role != null) ? data:null)
    const pages = arr.length/limit

    return arr.map((data,i)=>{
        if(i<pages)
          return <Menu.Item key={i} name ={`${i+1}`} active={activeItem ===(i+1)} onClick={this.handleItemClick} />
        else return null;
    })
  }

  renderRow(limit){
    const { users } = this.props
    let page = this.state.activeItem
    let startIndex=((+page)*limit)-(limit)
    let startNo = startIndex
    let arr = users.filter((data,i)=>(i>=startIndex&&data.Role != null) ? data:null)
    console.log('asdf',arr);
    return arr.map((data,i) =>{
      startNo+=1
      if(i<limit){
        return(
          <Table.Row key={i}>
          <Table.Cell>{startNo}</Table.Cell>
          <Table.Cell>{data.username}</Table.Cell>
          <Table.Cell>{data.Role.type }</Table.Cell>
          <Table.Cell textAlign={'center'}>
          <Link to={{pathname:`/users/edit/${startNo}`}}>
            <Button circular inverted color='orange'>edit</Button>
           </Link>
           <Button circular inverted color='red' onClick={() => this.handleDelete(startNo)}>delete</Button>
          </Table.Cell>
          </Table.Row>
        )
      }else return null
    })
  }

  render(){
    const { limit,activeItem } = this.state
    const { users } = this.props
    let pages = users.length/limit

    if(users.length===0){
      return(
            <div>
            <Breadcrumb size='big'>
              <Breadcrumb.Section active>Users</Breadcrumb.Section>
            </Breadcrumb>
                    <Loader active />
            </div>
          )
    }
    else
    return(
      <div>
      <Breadcrumb size='big'>
        <Breadcrumb.Section active>Users</Breadcrumb.Section>
      </Breadcrumb>
        <div>
          <div style={{marginTop:20,marginBottom:10}}>
            <Link to={{pathname:'/users/add'}}>
              <Button primary>New User</Button>
             </Link>
          </div>

            <div>
              <Table fixed celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>No</Table.HeaderCell>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  { this.renderRow(limit) }
                </Table.Body>
              </Table>
            </div>
        </div>
        <div style={{marginTop:10}}>
          <Menu pagination>
            {(activeItem===1) ? <Menu.Item name='Prev' disabled/>:<Menu.Item name='Prev' onClick={() => this.handlePrev()} />}
            {this.renderPage(limit)}
            {(pages<=activeItem) ? <Menu.Item name='Next' disabled/>:<Menu.Item name='Next'  onClick={() => this.handleNext()} />}
          </Menu>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addMenu: (data) => dispatch(addAction(data)),
    loadUsers: (type) => dispatch(loadAction(type))
  }
}


export default connect (mapStateToProps,mapDispatchToProps)(UserBody)
