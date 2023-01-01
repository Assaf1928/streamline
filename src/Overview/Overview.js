import React from 'react'
import  { Component }  from 'react';
import { Chart } from "react-google-charts";
import {firestore} from "../firebase.js"
import moment from 'moment'
import {getDocs, collection} from "@firebase/firestore"

class Overview extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: [

          ],
          options: {
            title: "Value For Date",
            curveType: "function",
            legend: { position: "bottom" },
          }
      };
    }
  
    async componentDidMount() {

      let newArray = [];
      newArray.push(["Date","Value"])
      const ref =  collection(firestore,"samples");
      let querySnapshot = await getDocs(ref)
      let newSamplesArray = []
      querySnapshot.forEach((doc) => {
        newSamplesArray.push(doc.data())
      })
      var startFrom = new Date();
      for(let i = 0; i < 4; i++) {
        var date = new Date();
        date.setDate(startFrom.getDate()+i);
        let indexCount = 0;
        let count = 0;
        newSamplesArray.forEach(sample => {
          date.setHours(0,0,0,0)
          let sampleDate =new Date(sample.time)
          sampleDate.setHours(0,0,0,0)
       //   console.log('sampleDate' + sampleDate, 'date' + date)
         // console.log(sampleDate.getTime() == date.getTime())

          if(sampleDate.getTime() == date.getTime()) {
            if(sample.tubes) {
            let BOD = 1 
            let bodTubes =   sample.tubes.filter(t=>t.type == BOD)
            bodTubes.forEach(m=> {
              if(m.value) {
                count += m.value
                indexCount++;
              }
            })
            }
          }
        });
        let strDate = date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
        console.log(date)
        console.log(strDate)
        newArray.push([strDate,count / indexCount])
        
      }
      this.setState({data: newArray})

      // 14 Date 

      // sort by date, per each date calculate average by tube typeId
      // value
      //this.setState({})
    }
  
    componentWillUnmount() {
      // Clean up listener
    }
  
    handleChange() {
      // Update component state whenever the data source changes
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