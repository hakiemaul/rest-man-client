import React from 'react';
import { Image,Header } from 'semantic-ui-react'

import Dtree from './Dtree'

export default () => {

  const data = [
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

  ]

  return(
    <div>
      <Header as='h3'>Dasboard</Header>
      <Dtree data={data} size={[500,700]} style={{marginBottom:20,marginTop:20,marginLeft:50,marginRight:20}} />
    </div>
  )
}
