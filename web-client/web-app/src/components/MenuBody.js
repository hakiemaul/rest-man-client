import React from 'react'
import { Table,Button,Icon,Menu,Breadcrumb } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addAction } from '../actions/addAction'
import { deleteAction } from '../actions/deleteAction'
import { loadAction } from '../actions/loadAction'
import { Link } from 'react-router-dom'

class MenuBody extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      menu:[],
      activeItem: 1,
      limit: 5
    }
  }

  componentDidMount(){
    this.props.loadMenu('menu')

  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: +name })

  handlePrev = () => this.setState({ activeItem: this.state.activeItem-1 })

  handleNext = () => this.setState({ activeItem: this.state.activeItem+1 })

  handleDelete = (i) => {

    this.props.deleteMenu(i,'menu');
  }

  renderPage(limit){
    const { activeItem } = this.state
    const { menu } = this.props
    const pages = menu.length/limit

    return menu.map((data,i)=>{
        if(i<pages)
          return <Menu.Item key={i} name ={`${i+1}`} active={activeItem ===(i+1)} onClick={this.handleItemClick} />
        else return null;
    })
  }

  renderRow(limit){
    const { menu } = this.props
    let page = this.state.activeItem
    let startIndex=((+page)*limit)-(limit)
    let startNo = startIndex
    let arr = menu.filter((data,i)=>(i>=startIndex) ? data:null)

    return arr.map((data,index) =>{

      startNo+=1
      if(index<limit){
        return(
          <Table.Row key={startNo}>
            <Table.Cell>{startNo}</Table.Cell>
            <Table.Cell>{data.name}</Table.Cell>
            <Table.Cell>{data.description}</Table.Cell>
            <Table.Cell>{(data.id_category===1)?'makanan':'minuman'}</Table.Cell>
            <Table.Cell>Rp. {data.price.toLocaleString(['ban', 'id'])}</Table.Cell>
            <Table.Cell textAlign={'center'}>
            <Link to={{pathname:`/menu/edit/${data.id}`}} >
              <Button circular inverted color='orange'>edit</Button>
             </Link>
             <Button circular inverted color='red' onClick={() => this.handleDelete(data.id)}>delete</Button>
            </Table.Cell>
          </Table.Row>
         )
      }else return null
    })
  }

  render(){
    const { limit,activeItem } = this.state;
    const { menu } = this.props


    if(menu){
    let pages = menu.length/limit;
    return (
      <div>
        <div>
        <Breadcrumb size='big'>
          <Breadcrumb.Section active>Menu</Breadcrumb.Section>
        </Breadcrumb>
          <div style={{marginTop:20,marginBottom:10}}>
            <Link to={{pathname:'/menu/add'}}>
              <Button primary>New Menu</Button>
             </Link>
          </div>
          <div>
            <Table fixed celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>No</Table.HeaderCell>
                  <Table.HeaderCell>Nama</Table.HeaderCell>
                  <Table.HeaderCell>Deskripsi</Table.HeaderCell>
                  <Table.HeaderCell>Kategori</Table.HeaderCell>
                  <Table.HeaderCell>Harga</Table.HeaderCell>
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
   }else {
     return (<div></div>)
   }
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menuReducer.menu
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addMenu: (data) => dispatch(addAction(data)),
    loadMenu: (type) => dispatch(loadAction(type)),
    deleteMenu: (id,type) => dispatch(deleteAction(id,type))
  }
}


export default connect (mapStateToProps,mapDispatchToProps)(MenuBody)
