import React from 'react'
import { Table,Header,Button,Icon} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addAction } from '../actions/addAction'
import { Link } from 'react-router-dom'

class MenuBody extends React.Component {

  constructor(){
    super()
    this.state = { menu:[] }
  }


  render(){
    console.log(this.props.menu);
    const { menu } = this.props
    var headers = Object.keys(menu[0])
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
                menu.map((data,index) => (
                    <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.category}</Table.Cell>
                    </Table.Row>
                  )
                )
              }
            </Table.Body>
          </Table>
        </div>
        <div style={{marginTop:20}}>
          <Link to={{pathname:'/menu/add'}}>
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
    menu: state.menuReducer.menu
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addMenu: (data) => dispatch(addAction(data))
  }
}


export default connect (mapStateToProps,mapDispatchToProps)(MenuBody)
