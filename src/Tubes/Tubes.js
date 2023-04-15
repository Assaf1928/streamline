import React from 'react'
import {firestore} from "../firebase.js"
import './Tubes.css';
import {addDoc, getDocs, collection, doc, setDoc} from "@firebase/firestore"
import  { Component }  from 'react';
import {TubeTypes} from '../Consts/TubesTypes.js'
import {Col,Row,Form, Button, Card} from 'react-bootstrap';
import axios from 'axios'



class Tubes extends Component {
    constructor(props) {
      super(props);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSaving = this.handleSaving.bind(this);
    this.duplicateTube = this.duplicateTube.bind(this);
    this.deleteTube = this.deleteTube.bind(this);
      this.state = {
         tubes:[],
         dbId: null
      };
    }

   async  componentDidMount() {
    const url = window.location.href;
    let splitUrl = url.split('/')
    let lastIndex = splitUrl.length - 2;
    if(splitUrl) {
    let id =  splitUrl[lastIndex]
    console.log(id)
    axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/samples/${id}/tubes`).then((res) => {
    console.log(res.data.vm)

      this.setState({dbId: id, tubes: res.data.vm})
    })
}
    }
  
    componentWillUnmount() {
    }
    duplicateTube(tube) {
      let newTubes = this.state.tubes
      newTubes.push({...tube, value: 0, id: Math.random(0,9999)})
      this.setState({tubes: newTubes})
    }
    deleteTube(tube) {
      let newTubesList = this.state.tubes.filter(t=>tube.id !== t.id)
      this.setState({tubes: newTubesList})
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
  
    
     renderInput = (tube, i) => {
        return(

            <Card className='card_container'>
            <Card.Header>                        
                <div className='tab_name'>{tube.typeName}</div>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
              <div key={ tube.typeId }>
                <div class="mt-4 mb-2">
                    <Row><Col xs lg="1">
                         <Form.Control step="0.01" className="input_width" size="LG" type="number" name={ tube.id }  value= {tube.value} onChange={ this.handleInputChange }  />
                    </Col>
                    <Col xs lg="1">
                          <Button variant="outline-primary"onClick={ () => this.duplicateTube(tube)} >Add</Button>{' '}
                          </Col>
                          <Col xs lg="1">
                          <Button variant="outline-danger" onClick={ () => this.deleteTube(tube)}>Remove</Button>{' '}
                          </Col>
                          </Row>

                </div>
                
            </div>
              </blockquote>
            </Card.Body>
          </Card>
     
        )
    }

    render() {

        return (
            <div>
            <div class="title"> Add Tube Values</div>

            <div className='container'>
            {
                
            this.state.tubes.sort((a,b) => {
            if(a.name < b.name) {
                return - 1
            } if(a.name > b.name) {
                return 1;
            }
            return 0
            }).map(this.renderInput)
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
