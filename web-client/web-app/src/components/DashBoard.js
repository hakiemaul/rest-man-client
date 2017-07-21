import React from 'react';
import { connect } from 'react-redux'
import { Segment,List,Header,Container,Grid,Dropdown,Button,Modal,Icon,Item,Loader,Dimmer } from 'semantic-ui-react'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import axios from 'axios';

import { loadAction } from '../actions/loadAction'
import Dtree from './Dtree'

const today = new Date();
const host = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'

const dateOptions = [
  { text: 'day',value:false },
  { text: 'week',value:true }
]


class Dasboard extends React.Component {

  constructor(){
    super()
    this.state={sum:[],today:'',sugestionMenu:[],finalResult:[],is_weekly:false,is_loading:true}
  }

  handleSelected(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    var time = `${yyyy}-0${mm}-${dd}`

    this.setState({is_loading:true})

    if(this.state.is_weekly){
    axios.post(`${host}/report/weekly`,{
      date:time
    })
    .then(response => {

      const {sum,sugestionMenu} = response.data

      if(sugestionMenu){
        const FilteredMenu=sugestionMenu.filter(d =>(sum[0].name.toLowerCase()!==d.label.toLowerCase()) )
          this.setState({sum:response.data.sum,finalResult:response.data.finalResult,sugestionMenu:FilteredMenu,totalTrx:response.data.totalTrx,is_loading:false})
      }else {
        this.setState({sum:[],finalResult:[],sugestionMenu:[],is_loading:false})
      }})
    }else {
      var currentDate = new Date().toDateString()
      if(date.toDateString()===currentDate){
        axios.get(`${host}/report/current`)
        .then(response => this.setState({sum:response.data.sum,finalResult:response.data.finalResult,totalTrx:response.data.totalTrx,is_loading:false}))
      }
      else {
        axios.post(`${host}/report/daily`,{
          date:time
        })
        .then(response => this.setState({sum:response.data.sum,finalResult:response.data.finalResult,totalTrx:response.data.totalTrx,is_loading:false}))
      }
    }
  }

  componentDidMount(){
    axios.get(`${host}/report/current`)
    .then(respone => this.setState({sum:respone.data.sum,finalResult:respone.data.finalResult,totalTrx:respone.data.totalTrx,is_loading:false}))
  }

  handleChange(e,data){
    this.setState({is_weekly:data.value})
  }

  renderCalender(){

    if(this.state.is_weekly){
    return(<InfiniteCalendar
          width={300}
          height={200}
          disabledDays={[0,2,3,4,5,6]}
          onSelect={(today)=>this.handleSelected(today)}
          displayOptions={{showOverlay:true,showHeader:false}}
          />)
    }else{return (<InfiniteCalendar
          width={300}
          height={200}
          display={'days'}
          selected={today}
          onSelect={(today)=>this.handleSelected(today)}
          displayOptions={{showOverlay:true,showHeader:false}}
          />)
    }
  }

  renderList(sum){
      const filteredData = sum.filter((d,i) =>(i<3))
      console.log('data',filteredData);
      return filteredData.map(data =>
        (<List.Item key={data.id}>
           <List.Content>
             <List.Header>{data.name}</List.Header>
             Total: {data.jumlah_qty}
           </List.Content>
         </List.Item>))
  }

  renderSugestion = () =>{
    return (<div>
        <Button
          basic
          color='green'
          content='Suggestion'
          icon='inbox'
          label={{ as: 'a', basic: true, color: 'blue', pointing: 'left', content:`${this.state.sugestionMenu.length}` }}
        />
      </div>)
   }


   ModalSuggestionMenu = () =>{

     return (
     <Modal trigger={this.renderSugestion()} triggerClose={true} >
       <Modal.Header>New Menu Suggestions</Modal.Header>
       <Modal.Content image scrolling>
         <Modal.Description style={{width:'100%'}}>
           <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
           <Item.Group style={{width:'100%'}}>
           {this.state.sugestionMenu.map((data,i) =>(
             <Item style={{width:'100%'}}>
               <Item.Image size='large' src={data.image} />

               <Item.Content>
                 <Item.Header as='Judul'>{data.label}</Item.Header>
                 <Item.Meta>Recipe</Item.Meta>
                 <Item.Description>
                  <List bulleted divided verticalAlign='middle'>
                     {data.ingredient.map(d => <List.Item>{d}</List.Item>)}
                  </List>
                 </Item.Description>
                 <Item.Extra href={data.url}><Icon name='linkify' />{data.url}</Item.Extra>
               </Item.Content>
             </Item>))}
           </Item.Group>
            </div>
         </Modal.Description>
       </Modal.Content>
       <Modal.Actions>
         <Button primary>
           oke
         </Button>
       </Modal.Actions>
     </Modal>
   )
 }

  render(){
    const { sum,is_weekly,is_loading,totalTrx,finalResult } = this.state
    if(sum){
    return(
      <div>
        <Header as='h3'>Dashboard</Header>
        <Container style={{display:'flex'}}>
          <Grid columns={2} style={{width:'100%'}}>
            <Grid.Column>
            <Segment raised style={{width:330}}>
                <Dropdown style={{marginBottom:'2%'}} selection  options={dateOptions} value={this.state.is_weekly} onChange={(e,data) => this.handleChange(e,data)} />
              {this.renderCalender()}
            </Segment>
            {(!is_loading)?
            (<div>
              <Segment raised style={{width:330}}>
              {(sum.length>0)?
                <div>
                <Header as='h3'>Top Sales</Header>
                    <List vertical ordered>
                    {this.renderList(sum)}
                    </List>
                </div>:<div>
                <Header as='h3'>Empty Data</Header>

                </div>
              }
            </Segment>
              {(is_weekly)?
              this.ModalSuggestionMenu():null}
            </div>):<div>
              <Segment raised style={{width:330}}>
            <div>
            <Header as='h3'>Top Sales</Header>
              <Dimmer active inverted>
                <Loader>Loading</Loader>
              </Dimmer>
            </div>
            </Segment>
            </div>}

            </Grid.Column>
            {(!is_loading)?
              (<Grid.Column>
                {(sum.length>0) ?
                  <Segment>

                   <Header size='huge'>Total: Rp. {totalTrx.total.toLocaleString(['ban', 'id'])}</Header>
                   <Header size='large'>{finalResult.length} Transaksi</Header>

                    <Dtree sum={sum} />
                  </Segment> :

                  <Segment style={{display:'flex',justifyContent:'center'}}>
                  <Header size='huge'>Empty Data</Header>
                  </Segment>
                }
              </Grid.Column>):<Grid.Column>
              <Dimmer active inverted>
                                <Loader>Loading</Loader>
                              </Dimmer>
              </Grid.Column>
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
