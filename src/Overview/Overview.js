import React from 'react'
import  { Component }  from 'react';
import { Chart } from "react-google-charts";
import {Form, Button} from 'react-bootstrap';
import './Overview.css'
import axios from 'axios';


class Overview extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSpotChange = this.handleSpotChange.bind(this);
      this.state = {
        locationId: 0,
        locations: [],
        tubeTypes: [],
        tubeTypeId: 1,
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

    axios.get('http://localhost:3000/tubes/types').then((res) => {
      this.setState({tubeTypes: res.data.res})
  })

  axios.get('http://localhost:3000/locations').then((res) => {
            this.setState({locations: res.data.res})
        })

      let newArray = [];
      newArray.push(["Date","Value"])
      var startFrom = new Date();
      startFrom.setDate(startFrom.getDate()-8);

      startFrom.setDate(startFrom.getDate() - 3)
      for(let i = 0; i < 8; i++) {
        var date = new Date();
        date.setDate(startFrom.getDate()+i);
        let indexCount = 0;
        let count = 0;
      //   newSamplesArray.forEach(sample => {
      //     date.setHours(0,0,0,0)
      //     let sampleDate =new Date(sample.time)
      //     sampleDate.setHours(0,0,0,0)
      //  //   console.log('sampleDate' + sampleDate, 'date' + date)
      //    // console.log(sampleDate.getTime() == date.getTime())

      //     if(sampleDate.getTime() == date.getTime()) {
      //       if(sample.tubes) {
      //       let BOD = this.state.tubeFilter
      //       let bodTubes =   sample.tubes.filter(t=>t.type == BOD)
      //       bodTubes.forEach(m=> {
      //         if(m.value) {
      //           count += parseInt(m.value) 
      //           indexCount++;
      //         }
      //       })
      //       }
      //     }
      //   });
        let strDate = date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )
        console.log(date)
        console.log(strDate)
      let x =  Math.floor(Math.random() * 10)
        newArray.push([strDate,x])
        
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
      this.setState({locationId: event.target.value})
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

      let locationSelect = "";
      let typeSelect = "";
      if(this.state.locations && this.state.locations.length > 0) {
        locationSelect =  <Form.Select className='select' name="locationId" value={this.state.locationId} onChange={(event) =>  this.handleSpotChange(event)}>
      <option value="0"> None</option>
         {this.state.locations.map(location=> {
          return  <option  key={location.id} value={location.id}>{location.name}</option>
          })}

        </Form.Select>
}

if(this.state.tubeTypes && this.state.tubeTypes.length > 0) {
  typeSelect =  <Form.Select className='select' name="tubeTypeId" value={this.state.tubeTypeId} onChange={(event) =>  this.handleSpotChange(event)}>
<option value="0"> None</option>
   {this.state.tubeTypes.map(tubeType=> {
    return  <option  key={tubeType.id} value={tubeType.id}>{tubeType.name}</option>
    })}

  </Form.Select>
}

      return (
        <div>
          <div>
        {typeSelect}
        </div><div>
         {locationSelect}
         </div>
         <div className='date_containers'>
          <div>
          <div>From</div>
         <input type="date" onChange={() => this.orginaizeData()}  ></input>
         </div>
         <div>
         <div>To</div><div><input onChange={() => this.orginaizeData()} type="date"></input></div>
         </div>
         </div>
         <div>
          <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={this.state.data}
        options={this.state.options}
      /></div>
      </div>
      );
    }
  }

  export default Overview;