import React from 'react'
import  { Component }  from 'react';
import { Chart } from "react-google-charts";
import {firestore} from "../firebase.js"
import moment from 'moment'
import { Spots } from '../Consts/Spots.js';
import {getDocs, collection} from "@firebase/firestore"

class Overview extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSpotChange = this.handleSpotChange.bind(this);
      this.state = {
        spotId: 0,
        tubeFilter: 1,
        data: [

          ],
          options: {
            title: "Value For Date",
            curveType: "function",
            legend: { position: "bottom" },
          }
      };
    }
  
   async orginaizeData() {
      let newArray = [];
      newArray.push(["Date","Value"])
      const ref =  collection(firestore,"samples");
      let querySnapshot = await getDocs(ref)
      let newSamplesArray = []
      querySnapshot.forEach((doc) => {
        let shouldPush = false;
        if(this.state.spotId && this.state.spotId != "0") {
          let data = doc.data()
          shouldPush = data.spotId == this.state.spotId
        } else {
          shouldPush = true
        }
        if(shouldPush) {
          newSamplesArray.push(doc.data())
        }
      })
      var startFrom = new Date();
      startFrom.setDate(startFrom.getDate() - 3)
      for(let i = 0; i < 8; i++) {
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
            let BOD = this.state.tubeFilter
            let bodTubes =   sample.tubes.filter(t=>t.type == BOD)
            bodTubes.forEach(m=> {
              if(m.value) {
                count += parseInt(m.value) 
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
    }

    async componentDidMount() {
        await this.orginaizeData()

      // 14 Date 

      // sort by date, per each date calculate average by tube typeId
      // value
      //this.setState({})
    }
  
    componentWillUnmount() {
      // Clean up listener
    }
    async handleSpotChange(event) {
      if(event && event.target && event.target.value) {
      this.setState({spotId: event.target.value})
      await this.orginaizeData()
      }
    }
   async handleChange(event) {
    if(event && event.target && event.target.value) {

      this.setState({tubeFilter: event.target.value})
      await this.orginaizeData()
    }
      // Update component state whenever the data source changes
    }
      
    render() {

      let spotSelect = "";
      if(Spots && Spots.length > 0) {
        spotSelect =  <select name="spotId" value={this.state.spotId} onChange={(event) =>  this.handleSpotChange(event)}>
      <option value="0"> None</option>
         {Spots.map(spot=> {
          return  <option  key={spot.id} value={spot.id}>{spot.name}</option>
          })}

        </select>
}
      return (
        <div>
         <select onChange={(e) => this.handleChange(e)}>
          <option value="1">BOD</option>
          <option value="2">COD</option>
         </select>
         {spotSelect}
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