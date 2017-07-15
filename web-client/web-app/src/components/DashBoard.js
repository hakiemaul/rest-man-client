import React from 'react';
import { Header } from 'semantic-ui-react'

import Dtree from './Dtree'

class Dasboard extends React.Component {

  constructor(){
    super()
    this.state = {transaksi : [
      {nama:'a',jumlah:10},
      {nama:'b',jumlah:20},
      {nama:'c',jumlah:30},
      {nama:'d',jumlah:40},
      {nama:'e',jumlah:50},
      {nama:'e',jumlah:60},
      {nama:'e',jumlah:20},
      {nama:'e',jumlah:10},
      {nama:'e',jumlah:30},
      {nama:'e',jumlah:40},
      {nama:'e',jumlah:50},
      {nama:'e',jumlah:70},
      {nama:'e',jumlah:40},
      {nama:'e',jumlah:10},
      {nama:'e',jumlah:20},
      {nama:'e',jumlah:30},
    ]}
  }

  handle(){
    this.setState({transaksi : [
      {nama:'a',jumlah:10},
      {nama:'b',jumlah:30},
      {nama:'c',jumlah:20},
      {nama:'d',jumlah:80},
      {nama:'e',jumlah:10},
      {nama:'e',jumlah:60},
      {nama:'e',jumlah:20},
      {nama:'e',jumlah:40},
      {nama:'e',jumlah:30},
      {nama:'e',jumlah:40},
      {nama:'e',jumlah:90},
      {nama:'e',jumlah:10},
      {nama:'e',jumlah:40},
      {nama:'e',jumlah:60},
      {nama:'e',jumlah:70},
      {nama:'e',jumlah:10},
    ]})
  }

  render(){
    const { transaksi } = this.state
    return(
      <div>
        <Header as='h3'>Dasboard</Header>
        <button onClick={() => { this.handle()}}>test</button>
        <Dtree data={transaksi} size={[500,700]} style={{marginBottom:20,marginTop:20,marginLeft:50,marginRight:20}} />
      </div>
    )
  }
}

export default Dasboard
