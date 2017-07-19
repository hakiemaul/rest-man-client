import React from 'react'
import jsPDF from 'jspdf'
import { Table,Header,Button, Dropdown,Menu} from 'semantic-ui-react'
import { connect } from 'react-redux'

import { loadAction } from '../actions/loadAction'


const timeOrder = [{ text: 'Day',value: 'day',},
                   { text: 'Week', value: 'week'},
                   { text: 'Month', value: 'month' }]


class ReportBody extends React.Component {

  constructor(){
    super()
    this.state = {
      order:'',
      activeItem: 1,
      limit:10
    }
  }

  componentDidMount(){
    this.props.loadTransaction('transactions')
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: +name })

  handlePrev = () => this.setState({ activeItem: this.state.activeItem-1 })

  handleNext = () => this.setState({ activeItem: this.state.activeItem+1 })

  onPrint(type) {
    const { transactions } = this.props

    let doc = new jsPDF('p','pt','c6');
    let pageHeight = doc.internal.pageSize.height;
    let length = transactions.length;
    let y_height = 60;
    let enter_space = 20;
    let margin = 20;
    let current_num =0;


    doc.setFontSize(15);
    doc.text(margin,40, 'Transactions');
    doc.setFontSize(10);
    doc.text(margin,60,'No          ID              Total');

    for (let i = 0; i < length; i++) {
      let total = transactions[current_num].pay-transactions[current_num].refund
      if(i<9){
        y_height+=enter_space;
        doc.text(margin,y_height,` ${current_num+1}.        ${transactions[current_num].name}             ${total}`)
        current_num++
      }else{
        y_height+=enter_space;
        doc.text(margin,y_height,` ${current_num+1}.      ${transactions[current_num].name}           ${total}`)
        current_num++
        if(y_height >= pageHeight){
          doc.addPage()
          y_height= 0;
        }
      }
    }

    if(type==='show')
    doc.output('dataurlnewwindow')
    else
    doc.save("test1.pdf")
  }

  handleChange(e,data){
    this.setState({order:data.value})
  }

  renderPage(limit){
    const { transactions } = this.props
    const { activeItem } = this.state
    const pages = transactions.length/limit

    return transactions.map((data,i)=>{
        if(i<pages)
          return <Menu.Item key={i} name ={`${i+1}`} active={activeItem ===(i+1)} onClick={this.handleItemClick} />
        else return null;
    })
  }

  renderRow(limit){
    const { transactions } = this.props
    let page = this.state.activeItem
    let startIndex=((+page)*limit)-(limit)
    let startNo = startIndex
    let arr = transactions.filter((data,i)=>(i>=startIndex) ? data:null)
    let total = 0

    return arr.map((data,i) =>{
      startNo+=1
      let total=data.pay-data.refund
      if(i<limit){
        return(
          <Table.Row key={i}>
          <Table.Cell >{startNo}</Table.Cell>
          <Table.Cell >{data.name}</Table.Cell>
          <Table.Cell >{total}</Table.Cell>
          </Table.Row>
        )
      }else return null
    })
  }

  render(){

    const { limit,activeItem } = this.state
    const { transactions } = this.props
    let pages = transactions.length/limit
    return (
      <div>
      <Header as='h3'>Report</Header>
        <div>
          <Dropdown placeholder='Select ordered by' value={this.state.order} selection options={timeOrder}
            onChange={(e,data) => {this.handleChange(e,data)}}
            style={{marginTop:10,marginBottom:10}}
          />
        </div>
        <div>
          <Table fixed celled>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell textAlign={'center'}>No</Table.HeaderCell>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.renderRow(limit)
              }
            </Table.Body>
          </Table>
        </div>
        <div style={{marginTop:10}}>
          <Menu pagination>
            {(activeItem===1) ? <Menu.Item name='Prev' disabled/>:<Menu.Item name='Prev' onClick={() => this.handlePrev()} />}
            {this.renderPage(limit)}
            {(pages<=activeItem) ? <Menu.Item name='Next' disabled/>:<Menu.Item name='Next'  onClick={() => this.handleNext()} />}
          </Menu>
        </div>
        <div style={{marginTop:20}}>
          <Button onClick={() =>{this.onPrint('show')}}>Show Pdf</Button>
          <Button onClick={() =>{this.onPrint('dl')}}>Download Pdf</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactionReducer.transactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadTransaction: (type) => dispatch(loadAction(type))
  }
}


export default connect (mapStateToProps,mapDispatchToProps)(ReportBody)
