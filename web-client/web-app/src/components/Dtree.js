import React, { Component } from 'react'
import { Grid,Header,Segment } from 'semantic-ui-react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'


class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
      this.state = {color:'#559FFF'}
   }

   componentDidMount() {
      this.createBarChart()
   }

   componentDidUpdate() {
    select(this.svg).selectAll("svg > *").remove()
    this.createBarChart()
   }

   createBarChart() {

     const sum = this.props.sum.map(data=>({name:data.name,jumlah:data.jumlah_qty}))

     const data = sum.map(d => d.jumlah)
     const menus = sum.map(d => d.name)

     const svg = select(this.svg)
     const width = 500, height = 450, marginLeft = 40
     const yscale = scaleLinear().domain([0,max(data)]).range([0,height-2*marginLeft])
     const xscale = scaleLinear().domain([0,data.length]).range([0,width-marginLeft])
     const x = scaleLinear().domain([0,data.length]).range([0,width-marginLeft])
     const y = scaleLinear().domain([0,max(data)]).range([height-marginLeft,marginLeft])

     const leftAxis = axisLeft()
     const bottomAxis = axisBottom().ticks(menus.length).tickFormat((d,i) => menus[i])

      svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x',(d,i) => marginLeft + xscale(i))
      .attr('y',d => height - yscale(d) - marginLeft)
      .attr('width',i => xscale(1)-sum.length)
      .attr('height',d => yscale(d))
      .attr('fill',this.state.color)

      svg.append('g')
      .attr('class','bottomaxis')
      .attr('transform',`translate(${marginLeft},${height-marginLeft})`)
      .call(bottomAxis.scale(x))

      svg.selectAll('.tick').attr('transform', (d, i) => `translate(${(d * xscale(1)-sum.length) + ((xscale(1)-sum.length) / 2)  },0)`);

      svg.append('g')
      .attr('class','leftaxis')
      .attr('transform',`translate(${marginLeft})`)
      .call(leftAxis.scale(y))
   }


  render() {
        return(<div>
              <svg ref={svg => this.svg = svg}
                width={'100%'} height={435}>
              </svg>
        </div>
      )
     }
}
export default BarChart
