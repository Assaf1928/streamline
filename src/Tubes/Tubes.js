import React from 'react'
import {firestore} from "../firebase.js"
import './Tubes.css';
import {addDoc, getDocs, collection, doc, setDoc} from "@firebase/firestore"
import  { Component }  from 'react';
import {TubeTypes} from '../Consts/TubesTypes.js'
import {Col,Row,Form, Button, Card} from 'react-bootstrap';
import axios from 'axios'
import moment from 'moment'
import fileDownload from 'js-file-download'




class Tubes extends Component {
    constructor(props) {
      super(props);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSaving = this.handleSaving.bind(this);
    this.duplicateTube = this.duplicateTube.bind(this);
    this.deleteTube = this.deleteTube.bind(this);
    this.rearrangeTubes = this.rearrangeTubes.bind(this)
    this.excelHandler = this.excelHandler.bind(this);
      this.state = {
         tubes:[],
         dbId: null,
         locations: [],
         locationName: '',
         name: '',
         time: '',
         sortedTubes: {},
         sampleId: null
      };
    }

   async  componentDidMount() {
    const url = window.location.href;
    let splitUrl = url.split('/')
    let lastIndex = splitUrl.length - 2;
    if(splitUrl) {
    let id =  splitUrl[lastIndex]

    axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/locations`).then((res) => {
      this.setState({locations: res.data.res})
  })
    
    axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/samples/${id}/tubes`).then((res) => {
    
      this.setState({sampleId: id})
    axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/samples/existance/${id}`).then((res) =>{
      if(res.data && res.data.sample) {

        let sample = res.data.sample
        let timeToString = moment(sample.time).format('DD/MM/yy HH:mm ')
        let location = this.state.locations.find(l=> l.id == sample.location)
        let locationName = location ? location.name : ''
      this.setState({locationName: locationName, name: res.data.userName, time: timeToString })
      }
    })

      this.setState({dbId: id, tubes: res.data.vm})
      this.rearrangeTubes(res.data.vm)
    })

}
    }
  
    componentWillUnmount() {
    }
    excelHandler() {
      axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/tubes/excel/${this.state.sampleId}`, {responseType: 'blob'})
      .then((res) => {
        var blob = new Blob([res.data], {
          type: res.headers["content-type"],
          name: 'test.xlsx'
        });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'tubes.xlsx');
        document.body.appendChild(link);
        link.download = 'tubex.xlsx'
        link.click();
        document.body.removeChild(link);

      });
    }
    rearrangeTubes(tubes) {
      let newTubesObject = {}
      tubes.forEach(element => {
        if(newTubesObject[element.typeName]) {
          newTubesObject[element.typeName].tubes.push(element)
        } else {
          newTubesObject[element.typeName] = {
            tubes: []
          }
          newTubesObject[element.typeName].tubes.push(element)
        }
      });
      this.setState({sortedTubes: newTubesObject})
      console.log(newTubesObject)
    }
    duplicateTube(tube) {
      let newTubes = this.state.tubes
      newTubes.push({...tube, value: 0, id: Math.random(0,9999)})
      this.setState({tubes: newTubes})
      this.rearrangeTubes(newTubes)
    }
    deleteTube(tube) {
      let newTubesList = this.state.tubes.filter(t=>tube.id !== t.id)
      this.setState({tubes: newTubesList})
      this.rearrangeTubes(newTubesList)
    }
    async handleSaving() {

      let id = this.state.dbId
      if(id){
        axios.post(`${process.env.REACT_APP_BACKEND_ROUTE}/samples/${id}/tubes`, {tubes: this.state.tubes}).then((res) => {
          axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/samples/${id}/tubes`).then((res) => {
            this.setState({tubes: res.data.vm})
        })
      })
      
      alert('Thank You! ')
      window.location.href = '/dashboard/samples'
      }

    
      }

    handleInputChange(event) {
       let tubeIndex =  this.state.tubes.findIndex(e=>e.id == event.target.name)
      if(this.state.tubes[tubeIndex]) {
        let tubes = [...this.state.tubes]
        tubes[tubeIndex].value = event.target.value
        this.setState({tubes: tubes})
    }
     }
  
     renderTube = (tube) => {
      return  (<Row>
        <Col xs lg="1">
        <Form.Control step="0.01" className="input_width" size="LG" type="number" name={ tube.id }  value= {tube.value} onChange={ this.handleInputChange }  />
   </Col>
   <Col xs lg="1">
         <Button variant="outline-primary"onClick={ () => this.duplicateTube(tube)} >Add</Button>{' '}
         </Col>
         <Col xs lg="1">
         <Button variant="outline-danger" onClick={ () => this.deleteTube(tube)}>Remove</Button>{' '}
         </Col>
         </Row>)
     } 
    
     renderInput = (tubes, i) => {
    if(!tubes[0]) 
    return 
    else
      return(
            <Card className='card_container'>
            <Card.Header>                        
                <div className='tab_name'>{tubes[0].typeName}</div>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
              <div key={ tubes[0].typeId }>
              <div class="mt-4 mb-2"><Row>{tubes.map(t=> this.renderTube(t)) }</Row></div>
                
            </div>
              </blockquote>
            </Card.Body>
          </Card>
        )
    }
  
    render() {
      
 
        return (
            <div>
              <div style={{cursor: 'pointer'}} onClick={() => this.excelHandler()}><b>Export To Excel</b></div>
            <div className='sample_details'>
              <h2>Sample Details</h2>
              <div className='sample_ct_details'><div> <b>Time</b> {this.state.time}</div> <div><b> Taken By</b> {this.state.name}</div><div> <b>Location </b>{this.state.locationName}</div></div>
            </div>
            <div class="title"> Add Tube Values</div>

            <div className='container'>
            {
               
               Object.keys(this.state.sortedTubes).map(prop => {
                console.log(this.state.sortedTubes[prop])
                return this.renderInput(this.state.sortedTubes[prop].tubes)
              })
            }
            
       </div>
       <div className='footer'>
       <div class="form-group">
    <label for="exampleFormControlTextarea1">Notes</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div>
  <Button onClick={() => this.handleSaving()}>Save</Button>
  </div>
  </div>
       </div>
          );
        }
  }

  export default Tubes;
