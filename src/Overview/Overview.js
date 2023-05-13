import React from 'react'
import  { Component }  from 'react';
import { Chart } from "react-google-charts";
import {Form, Button} from 'react-bootstrap';
import './Overview.css'
import axios from 'axios';
import GraphT1 from '../Graph/GraphT1';
import GraphT2 from '../Graph/GraphT2';

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
        graphData: [],
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
    if(this.state.locationId == 0 || this.state.tubeTypeId == 0 || this.state.toDate == null || this.state.fromDate == null) {
      return
    }
      let newArray = [];
      newArray.push(["Date","Value"])
      var startFrom = new Date();
      axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/overview/tubes/${this.state.locationId}/${this.state.tubeTypeId}/${this.state.fromDate}/${this.state.toDate}`).then((res)=> {
        res.data.forEach(e => {
          newArray.push([e.date,e.value])
        })
      
        this.setState({data: newArray})
        
      })
    }

    async componentDidMount() {
    await  axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/tubes/types`).then((res) => {
        this.setState({tubeTypes: res.data.res})
    })

    await axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/graph_t1`).then((res) => {
      this.setState({graphData: res.data})
    })
  
    await axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/locations`).then((res) => {
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
   //   await this.orginaizeData()
    })
    } 
  }

    async changeToDate(event) {
      if(event && event.target && event.target.value) {
        new Promise((resolve) => {
      this.setState({toDate: event.target.value})
      resolve()

    }).then(async () => {
    //  await this.orginaizeData()
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
      let graphs = ""
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

  if(this.state.tubeTypes && this.state.graphData && this.state.graphData.length > 0)
  {
    
  graphs = this.state.tubeTypes.map((ty) => <div className='graph_item'><GraphT1 graphData={this.state.graphData} type={ty}/></div>) 
    
  }
 let locationsGraph = this.state.graphData.length > 0 && this.state.locations.length > 0 ? 
 <GraphT2 locations={this.state.locations} graphData={this.state.graphData}  fromDate={this.state.fromDate} toDate={this.state.toDate} tubeType={this.state.tubeTypeId} /> : ''

      return (
        <div className='ct_graphs'>
          {/* <div>
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
      /></div> */}
  {graphs}
  <div style={{width: '100%'}}></div>
  <div style={{display: 'flex', flexDirection: 'column'}}>
  <div style={{width: '50%', margin: '0 auto'}}>  <div>{typeSelect}</div> 
  <div><Form.Control onChange={(e) => this.changeFromDate(e)} value={this.state.fromDate} type="date"/></div>
  <div><Form.Control onChange={(e) => this.changeToDate(e)} value={this.state.toDate}  type="date"/></div>
  </div>
  <div style={{margin: '0 auto', width: '100%'}}>{locationsGraph}</div>
  </div>
      </div>
      );
    }
  }

  export default Overview;