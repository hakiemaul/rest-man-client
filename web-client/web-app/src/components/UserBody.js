import React from 'react'
import { Table,Header,Button,Icon} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addAction } from '../actions/addAction'
import { Link } from 'react-router-dom'

class UserBody extends React.Component {

  constructor(){
    super()
    this.state = { users:[] }
  }


  render(){

    const { users } = this.props
    var headers = Object.keys(users[0])
    headers.unshift('no')
    return (
      <div>
        <div>
          <Header as='h3'>Menu</Header>
          <Table fixed>
            <Table.Header>
              <Table.Row>
              {
                headers.map((header,i) =>
                  <Table.HeaderCell key={i}>{header}</Table.HeaderCell>
                )
              }
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                users.map((data,index) => (
                    <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{data.username}</Table.Cell>
                    <Table.Cell>{data.role}</Table.Cell>
                    </Table.Row>
                  )
                )
              }
            </Table.Body>
          </Table>
        </div>
        <div>
          <Link to={{pathname:'/users/add'}}>
            <Button animated='vertical' on>
               <Button.Content visible>Add</Button.Content>
               <Button.Content hidden>
                 <Icon name='plus' />
               </Button.Content>
             </Button>
           </Link>
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
    addMenu: (data) => dispatch(addAction(data))
  }
}


export default connect (mapStateToProps,mapDispatchToProps)(UserBody)
