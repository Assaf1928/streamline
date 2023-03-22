import React from 'react'
import {firestore} from "../firebase.js"
import './CreateSample.css';
import  { Component }  from 'react';
import {addDoc, getDocs, collection, doc, setDoc} from "@firebase/firestore"
import {Spots} from '../Consts/Spots'
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import CreateQR from '../Dashboard/Items/CreateQR.js';
import moment from 'moment';


class CreateSample extends Component {
    constructor(props) {
      super(props);
      this.handleSaving = this.handleSaving.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);

      this.state = {
            id:  undefined,
            locations: [],
            temperature: 20,
            name:'',
            locationId: 0,
            time: new Date(),
            timeToString: new Date().toISOString().substring(0,10),
            isUpdate: false,
            dbId: undefined,
            note: ''
      };
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
      console.log(value)
        this.setState({
          [name]: value
        });
      }
    async handleSaving() {
      if(this.state.isUpdate && this.state.dbId) {
        axios.put(`http://localhost:3000/samples/${this.state.dbId}`,({locationId: this.state.locationId, note: this.state.note})).then(() => {
          alert('Thank You! ')
          window.location.href = '/dashboard/samples'
        })
      } else {
      axios.post('http://localhost:3000/samples',({locationId: this.state.locationId, qr: this.state.id, note: this.state.note, user: this.state.user.email})).then(() => {
        alert('Thank You! ')
        window.location.href = '/dashboard/samples'

    })
  }

  }
    
   async componentDidMount() {
    let date = this.state.time
    this.setState({timeToString: moment(date).format('DD/MM/yy HH:mm ')})
    axios.get('http://localhost:3000/locations').then((res) => {
      this.setState({locations: res.data.res})
  })

    let user = localStorage.getItem('user')
    console.log(user)
    if(user) {
      this.setState({user: JSON.parse(user)})
      console.log(this.state.user)
    } else {
      window.location.href = '/'

    }
        const url = window.location.href;
        let splitUrl = url.split('/')
        let lastIndex = splitUrl.length - 1;
        if(splitUrl) {
        let id =  splitUrl[lastIndex]
        console.log(id)
        axios.get(`http://localhost:3000/samples/existance/${id}`).then((res) =>{
          if(res.data && res.data.sample) {
            let sample = res.data.sample
            let timeToString = moment(sample.time).format('DD/MM/yy HH:mm ')
          this.setState({isUpdate: true, dbId : sample._id, qr: sample.qr, locationId: sample.location, note: sample.note, name: sample.user, timeToString: timeToString })
          }
        })
        this.setState({id: id}) 
    }
    }
  
    componentWillUnmount() {
      // Clean up listener
    }
  
    
  
    render() {
      let select = "";
      if(this.state && this.state.locations.length > 0 ) {
    select =  <Form.Select  name="locationId" value={this.state.locationId} onChange={(e) =>  this.handleInputChange(e)}>
      <option value="0"> None</option>
         {this.state.locations.map(location=> {
          return  <option  key={location.id} value={location.id}>{location.name}</option>
          })}

        </Form.Select>
}
      return (
<div>
        <div className="create_title">{ this.state.isUpdate ? 'Update' : 'Create'}  New Sample</div>

<div className='column'>
<div><CreateQR id={this.state.id}/>
</div>


<div className="form_container">
           <div>QR Code</div>
            <div> <Form.Control value={this.state.id} disabled /></div>
            <div>name</div>
            <div><Form.Control disabled onChange={(e) => this.handleInputChange(e)} name="name" value={this.state.user ? this.state.user.email : ''}/></div>
            <div>
            <div>Location</div>
            {select}
            </div>
           <div>Date Time</div>
            <div>
            <Form.Control name="time" value={this.state.timeToString} disabled onChange={() => this.handleInputChange} />
            </div>
           <div>Note</div>
            <div>
            <Form.Control name="note" value={this.state.note} onChange={(e) => this.handleInputChange(e)} />
           </div> 
           <div><Button type="button" onClick={() => this.handleSaving()}>{this.state.isUpdate ? 'Update' : 'Create'}</Button></div>
        </div>
</div>
</div>
      );
    }
  }

  export default CreateSample;
