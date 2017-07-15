import React from 'react'
import { Table,Header,Button, Dropdown,Menu} from 'semantic-ui-react'
import { connect } from 'react-redux'


const timeOrder = [{ text: 'Day',value: 'day',},
                   { text: 'Week', value: 'week'},
                   { text: 'Month', value: 'month' }]


class ReportBody extends React.Component {

  constructor(){
    super()
    this.state = {
      transactions:[],
      order:'',
      activeItem: 1,
      startCell:0,
      endCell:0,
      limit:10
      }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: +name })

  handlePrev = () => this.setState({ activeItem: this.state.activeItem-1 })

  handleNext = () => this.setState({ activeItem: this.state.activeItem+1 })

  onPrint(type) {
    const { transactions } = this.props
    var jsPDF = require('jspdf')
    var doc = new jsPDF('p','pt','c6');
    var enter_space = 50;
    var margin = 20;
    var length = 15;
    let a = 15;
    var start =0;
    doc.setFontSize(20);
    doc.text(margin,30, 'Transactions');

    doc.setFontSize(15);

    doc.text(margin,enter_space,'No     Nama       Total');

    let arr=transactions.filter((data,i)=> (i>=start) ? data : null )
console.log(arr);

      arr.map((data,i) => {
          enter_space+=margin;

          if(i<length){
            if(i<9){
              return doc.text(margin,enter_space,` ${i+1}.       ${data.id}      ${data.total}`)
            }
            else{
              return doc.text(margin,enter_space,` ${i+1}.     ${data.id}      ${data.total}`)
            }
          }
      })
      start+=length;
      doc.addPage()
      doc.text(margin,enter_space,'No     Nama       Total');
      arr=transactions.filter((data,i)=> (i>=start) ? data : null )
      console.log(arr);
      console.log(start);
      console.log(length);
      arr.map((data,i) => {
          enter_space+=margin;

          if(i<length){
            if(i<9){
              return doc.text(margin,enter_space,` ${i+1}.       ${data.id}      ${data.total}`)
            }
            else{
              return doc.text(margin,enter_space,` ${i+1}.     ${data.id}      ${data.total}`)
            }
          }
      })

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

    return arr.map((data,i) =>{
      startNo+=1
      if(i<limit){
        return(
          <Table.Row key={i}>
          <Table.Cell>{startNo}</Table.Cell>
          <Table.Cell>{data.id}</Table.Cell>
          <Table.Cell>{data.total}</Table.Cell>
          </Table.Row>
        )
      }else return null
    })
  }

  render(){

    const {limit } = this.state
    const { transactions } = this.props
    var headers = Object.keys(transactions[0])
    headers.unshift('no')

    return (
      <div>
        <div>
          <Header as='h3'>Report</Header>
          <Dropdown placeholder='Select ordered by' value={this.state.order} selection options={timeOrder}
            onChange={(e,data) => {this.handleChange(e,data)}}
            style={{marginTop:20,marginBottom:20}}
          />
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
                this.renderRow(limit)
              }
            </Table.Body>
          </Table>
          <Menu pagination>
        <Menu.Item name='Prev'  onClick={() => this.handlePrev()} />
        {this.renderPage(limit)}
        <Menu.Item name='Next'  onClick={() => this.handleNext()} />
      </Menu>
        </div>
        <div style={{marginTop:50}}><Button onClick={() =>{this.onPrint('show')}}>Show Pdf</Button></div>
        <div style={{marginTop:10}}><Button onClick={() =>{this.onPrint('dl')}}>Download Pdf</Button></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    transactions: state.reportReducer.transactions
  }
}


export default connect (mapStateToProps,null)(ReportBody)
