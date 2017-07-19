import React from 'react';
import { connect } from 'react-redux'
import { Segment,List,Image,Header,Container,Grid,Dropdown } from 'semantic-ui-react'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import axios from 'axios';

import { loadAction } from '../actions/loadAction'
import Dtree from './Dtree'

const today = new Date();
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const host = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'

const dateOptions = [
  { text: 'day',value:false },
  { text: 'week',value:true }
]


class Dasboard extends React.Component {

  constructor(){
    super()
    this.state={sum:'',today:'', is_weekly:false}
  }

  handleSelected(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    var time = `${yyyy}-0${mm}-${dd}`

    if(this.state.is_weekly){
      console.log('masuk coy');

    axios.post(`${host}/report/weekly`,{
      date:time
    })
    .then(respone => this.setState({sum:respone.data.sum}))
    }else {
      axios.post(`${host}/report/daily`,{
        date:time
      })
      .then(respone => this.setState({sum:respone.data.sum}))
    }
    console.log(this.state.sum);
    console.log(this.state.is_weekly);
  }

  componentDidMount(){
    axios.get(`${host}/report/current`)
    .then(respone => this.setState({sum:respone.data.sum}))
  }

  handleChange(e,data){

    this.setState({is_weekly:data.value})

    console.log(data.value);
  }

  renderCalender(){

    if(this.state.is_weekly){
    return(<InfiniteCalendar
          width={300}
          height={200}
          disabledDays={[0,2,3,4,5,6]}
          onSelect={(today)=>this.handleSelected(today)}
          displayOptions={{showOverlay:true},{showHeader:false}}
          />)
    }else{return (<InfiniteCalendar
          width={300}
          height={200}
          display={'days'}
          selected={today}
          onSelect={(today)=>this.handleSelected(today)}
          displayOptions={{showOverlay:true},{showHeader:false}}
          />)
    }
  }

  renderList(sum){
      return(sum.map((data,i) =>{
      if(i<3){
       return (<List.Item key={data.id}>
         <Image avatar src='http://www.pngall.com/wp-content/uploads/2016/03/Food.png' />
         <List.Content>
           <List.Header>{data.name}</List.Header>
           Total: {data.jumlah_qty}
         </List.Content>
       </List.Item>)
     }
   }))
  }

  render(){
    const { sum } = this.state
    if(sum){
    return(
      <div>
        <Header as='h3'>Dasboard</Header>
        <Dropdown selection  options={dateOptions} value={this.state.is_weekly} onChange={(e,data) => this.handleChange(e,data)} />
        <Container style={{display:'flex'}}>
          <Grid columns={2} style={{width:'100%'}}>
            <Grid.Column>
            <Segment raised style={{width:330}}>
              {this.renderCalender()}
            </Segment>
            {(sum.length>0)?
            (<Segment raised style={{width:330}}>
            <div>
            <Header as='h3'>Top Three</Header>
                <List vertical ordered>
                {this.renderList(sum)}
                </List>
            </div>
            </Segment>):null}
            </Grid.Column>
            {(sum.length>0)?
              (<Grid.Column>
                <Dtree sum={sum} size={[500,700]} style={{height:'100%'}} />
              </Grid.Column>):null
            }
          </Grid>

        </Container>

      </div>
    )}
    else {
      return <div></div>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    report: state.reportReducer.report
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadReport: (type) => dispatch(loadAction(type)),
    getDailyReport: (type,data) => dispatch(loadAction(type,data))
  }
}


export default connect (mapStateToProps,mapDispatchToProps)(Dasboard)
