import React from 'react';
import { connect } from 'react-redux'
import { Segment,List,Image,Header,Container,Grid,Dropdown,Button,Modal,Icon,Item,Loader,Dimmer } from 'semantic-ui-react'
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
    this.state={sum:[],today:'',sugestionMenu:[],is_weekly:false,is_loading:true}
  }

  handleSelected(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    var time = `${yyyy}-0${mm}-${dd}`

    this.setState({is_loading:true})

    if(this.state.is_weekly){
      console.log('masuk coy');

    axios.post(`${host}/report/weekly`,{
      date:time
    })
    .then(response => this.setState({sum:response.data.sum,sugestionMenu:response.data.sugestionMenu,is_loading:false}))
    }else {
      axios.post(`${host}/report/daily`,{
        date:time
      })
      .then(response => this.setState({sum:response.data.sum,is_loading:false}))
    }
    console.log(this.state.sum);
    console.log(this.state.is_weekly);
  }

  componentDidMount(){
    axios.get(`${host}/report/current`)
    .then(respone => this.setState({sum:respone.data.sum,is_loading:false}))
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
       <Modal.Header>New Suggestions</Modal.Header>
       <Modal.Content image scrolling>
         <Modal.Description style={{width:'100%'}}>
           <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
           <Item.Group style={{width:'100%'}}>
           {this.state.sugestionMenu.map((data,i) =>(
             <Item style={{width:'30%'}}>
               <Item.Image size='tiny' src={data.image} />

               <Item.Content>
                 <Item.Header as='Judul'>{data.label}</Item.Header>
                 <Item.Meta>Recipe</Item.Meta>
                 <Item.Description>
                  <List bulleted>
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
    const { sum,is_weekly,is_loading } = this.state
    if(sum){
    return(
      <div>
        <Header as='h3'>Dasboard</Header>
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
            <div>
            <Header as='h3'>Top Three</Header>
                <List vertical ordered>
                {this.renderList(sum)}
                </List>
            </div>
            </Segment>
              {(is_weekly)?
              this.ModalSuggestionMenu():null}
            </div>):<div>
              <Segment raised style={{width:330}}>
            <div>
            <Header as='h3'>Top Three</Header>
            <Dimmer active inverted>
                              <Loader>Loading</Loader>
                            </Dimmer>
            </div>
            </Segment>

            </div>}
            </Grid.Column>
            {(!is_loading)?
              (<Grid.Column>
                <Segment>
                  <Dtree sum={sum} />
                </Segment>
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
