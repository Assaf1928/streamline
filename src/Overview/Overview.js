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
      this.changeFromDate = this.changeFromDate.bind(this);
      this.changeToDate = this.changeToDate.bind(this);

      this.state = {
        locationId: 0,
        locations: [],
        tubeTypes: [],
        toDate: null,
        fromDate: null,
        tubeTypeId: 0,
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
console.log(this.state.locationId)
console.log(this.state.tubeTypeId)
    if(this.state.locationId == 0 || this.state.tubeTypeId == 0 || this.state.toDate == null || this.state.fromDate == null) {
      return
    }
console.log('im here')
      let newArray = [];
      newArray.push(["Date","Value"])
      var startFrom = new Date();
      axios.get(`http://localhost:3000/overview/tubes/${this.state.locationId}/${this.state.tubeTypeId}/${this.state.fromDate}/${this.state.toDate}`).then((res)=> {
        res.data.forEach(e => {
          newArray.push([e.date,e.value])
        })
        console.log('RESULT')
      
        this.setState({data: newArray})
        
      })
    }

    async componentDidMount() {
    await  axios.get('http://localhost:3000/tubes/types').then((res) => {
        this.setState({tubeTypes: res.data.res})
    })
  
    await axios.get('http://localhost:3000/locations').then((res) => {
              this.setState({locations: res.data.res})
          })
        await this.orginaizeData()

      // 14 Date 

      // sort by date, per each date calculate average by tube typeId
      // value
      //this.setState({})
    }
  
    componentWillUnmount() {
      // Clean up listener
    }
    
    async HandleTubeType(event) {
      if(event && event.target && event.target.value) {
        new Promise((resolve) => {
      this.setState({tubeTypeId: event.target.value})
      resolve()
    }).then(async () => {
      await this.orginaizeData()
    })
  }
    }
    async handleSpotChange(event) {

      if(event && event.target && event.target.value) {
        new Promise((resolve) => {
      this.setState({locationId: event.target.value})
      resolve()

    }).then(async () => {
      await this.orginaizeData()
    })
  }
    }
    async changeFromDate(event) {
      if(event && event.target && event.target.value) {
        new Promise((resolve) => {
      this.setState({fromDate: event.target.value})
      resolve()

    }).then(async () => {
      await this.orginaizeData()
    })
    } 
  }

    async changeToDate(event) {
      if(event && event.target && event.target.value) {
        new Promise((resolve) => {
      this.setState({toDate: event.target.value})
      resolve()

    }).then(async () => {
      await this.orginaizeData()
    })
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
  typeSelect =  <Form.Select className='select' name="tubeTypeId" value={this.state.tubeTypeId} onChange={(event) =>  this.HandleTubeType(event)}>
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
         <input type="date" onChange={(e) => this.changeFromDate(e)}  ></input>
         </div>
         <div>
         <div>To</div><div><input onChange={(e) => this.changeToDate(e)} type="date"></input></div>
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