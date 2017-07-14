import React, { Component } from 'react'
import { Segment,List,Image,Grid,Header } from 'semantic-ui-react'
import { scaleLinear, scaleBand } from 'd3-scale'
import { min, max } from 'd3-array'
import { select } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
      this.state = {color:'#fe9920'}
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
     const data = this.props.data.map(d => d.jumlah)
     const nama = this.props.data.map(d => d.nama)
     const svg = select(this.svg)
     const width = 700, height = 300, margin = 20, marginLeft = 40
     const yscale = scaleLinear().domain([0,max(data)]).range([0,height-2*marginLeft])
     const xscale = scaleLinear().domain([0,data.length]).range([0,width-marginLeft])
     const x = scaleLinear().domain([0,data.length]).range([0,width-marginLeft])
     const y = scaleLinear().domain([0,max(data)]).range([height-marginLeft,marginLeft])

     const leftAxis = axisLeft()
     const bottomAxis = axisBottom()

      svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x',(d,i) => marginLeft + xscale(i))
      .attr('y',d => height - yscale(d) - marginLeft)
      .attr('width',i => xscale(1)-5)
      .attr('height',d => yscale(d))
      .attr('fill',this.state.color)

      svg.append('g')
      .attr('class','leftaxis')
      .attr('transform',`translate(${marginLeft})`)
      .call(leftAxis.scale(y))

      svg.append('g')
      .attr('class','bottomaxis')
      .attr('transform',`translate(${marginLeft},${height-marginLeft})`)
      .call(bottomAxis.scale(x))

   }

  render() {
        return(
        <Segment padded='very' style={{marginBottom:20,marginTop:20,marginLeft:50,marginRight:20}}>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <svg ref={svg => this.svg = svg}
                width={1000} height={300}>
              </svg>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
            <Header as='h3'>Top Three</Header>
                <List vertical ordered>
                 <List.Item>
                   <Image avatar src='http://www.pngall.com/wp-content/uploads/2016/03/Food.png' />
                   <List.Content>
                     <List.Header>Makanan1</List.Header>
                     total 30
                   </List.Content>
                 </List.Item>
                 <List.Item>
                   <Image avatar src='http://www.pngall.com/wp-content/uploads/2016/03/Food-Free-PNG-Image.png' />
                   <List.Content>
                     <List.Header>Makanan2</List.Header>
                     total 20
                   </List.Content>
                 </List.Item>
                 <List.Item>
                   <Image avatar src='http://www.pngall.com/wp-content/uploads/2016/03/Food-PNG-HD.png' />
                   <List.Content>
                     <List.Header>Makanan3</List.Header>
                     total 10
                   </List.Content>
                 </List.Item>
                </List>
              </Grid.Column>
            </Grid>
        </Segment>
      )
     }
}
export default BarChart
