import React from 'react'
import  { Component }  from 'react';
import { Chart } from "react-google-charts";
import {TubeTypes} from '../Consts/TubesTypes'
class Overview extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: [
            ["Date","Value"],
            [new Date().toISOString().substring(0,10), 10],
            [new Date().toISOString().substring(0,10), 20],
            [new Date().toISOString().substring(0,10), 30],
            [new Date().toISOString().substring(0,10), 40],
          ],
          options: {
            title: "Value For Date",
            curveType: "function",
            legend: { position: "bottom" },
          }
      };
    }
  
    componentDidMount() {
    }
  
    componentWillUnmount() {
      // Clean up listener
    }
  
    handleChange() {
      // Update component state whenever the data source changes
    }
    getPropName(t) {
     return Object.getOwnPropertyNames(t)
    }
      
    render() {
      return (
        <div>
         <select>
          <option value="0">None</option>
          <option value="1">BOD</option>
          <option value="2">COD</option>
         </select>
          
          <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={this.state.data}
        options={this.state.options}
      /></div>
      );
    }
  }

  export default Overview;