import React from 'react'
import { firestore } from "../firebase.js"
import './CreateSample.css';
import { Component } from 'react';
import { addDoc, getDocs, collection, doc, setDoc } from "@firebase/firestore"
import { Spots } from '../Consts/Spots'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import CreateQR from '../Dashboard/Items/CreateQR.js';
import moment from 'moment';
import Alert from '@mui/material/Alert';


class CreateSample extends Component {
  constructor(props) {
    super(props);
    this.handleSaving = this.handleSaving.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      id: undefined,
      locations: [],
      temperature: 20,
      name: '',
      locationId: 0,
      time: new Date(),
      timeToString: new Date().toISOString().substring(0, 10),
      isUpdate: false,
      dbId: undefined,
      note: '',
      isSaved: false
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
    if (this.state.locationId == 0) {
      alert('you must fill all fields')
      return
    }
    if (this.state.isUpdate && this.state.dbId) {
      axios.put(`${process.env.REACT_APP_BACKEND_ROUTE}/samples/${this.state.dbId}`, ({ locationId: this.state.locationId, note: this.state.note })).then(() => {
        alert('Thank You! ')
        window.location.href = '/dashboard/samples'

      })
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_ROUTE}/samples`, ({ locationId: this.state.locationId, qr: this.state.id, note: this.state.note, user: this.state.user.email })).then(() => {
        alert('Thank You! ')
        this.setState({ isSaved: true })

        // window.location.href = '/dashboard/samples'

      })
    }

  }

  async componentDidMount() {
    let date = this.state.time
    this.setState({ timeToString: moment(date).format('DD/MM/yy HH:mm ') })
    axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/locations`).then((res) => {
      this.setState({ locations: res.data.res })
    })

    let user = localStorage.getItem('user')
    if (user) {
      this.setState({ user: JSON.parse(user) })
      console.log(this.state.user)
    } else {
      window.location.href = '/'

    }
    const url = window.location.href;
    let splitUrl = url.split('/')
    let lastIndex = splitUrl.length - 1;
    if (splitUrl) {
      let id = splitUrl[lastIndex]
      console.log(id)
      axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/samples/existance/${id}`).then((res) => {
        if (res.data && res.data.sample) {
          let sample = res.data.sample
          let timeToString = moment(sample.time).format('DD/MM/yy HH:mm ')
          this.setState({ isUpdate: true, dbId: sample._id, qr: sample.qr, locationId: sample.location, note: sample.note, name: sample.user, timeToString: timeToString })
        }
      })
      this.setState({ id: id })
    }

    // React current user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          this.setState({ error: error.message });
        }
      );
    } else {
      this.setState({ error: 'Geolocation is not supported by this browser.' });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // Goes to the next page if the sample has been saved 
    if (this.state.isSaved) {
      window.location.href = '/dashboard/samples'
    }
  }

  componentWillUnmount() {
    // Clean up listener
  }



  render() {
    let select = "";
    if (this.state && this.state.locations.length > 0) {
      select =
        <Form.Select name="locationId" value={this.state.locationId} onChange={(e) => this.handleInputChange(e)}>
          <option value="0"> None</option>
          {this.state.locations.map(location => {
            return <option key={location.id} value={location.id}>{location.name}</option>
          })}

        </Form.Select>
    }

    // Error while reading current location 
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    return (
      <div>
        <div className="create_title">{this.state.isUpdate ? 'Update' : 'Create'}  New Sample</div>
        <div>{this.state.timeToString}</div>
        {/* <Form.Control name="time" value={this.state.timeToString} disabled onChange={() => this.handleInputChange} /> */}
        <div className='column'>
          <div className="form_container">
            <div>Sampler Name</div>
            <div><Form.Control disabled onChange={(e) => this.handleInputChange(e)} name="name" value={this.state.user ? this.state.user.name : ''} /></div>
            <div>
              <div>Sampling point</div>
              {select}
            </div>
            <div>Location</div>
            {(this.state.latitude === null || this.state.longitude === null) ? (<div>Loading...</div>) : (
              <div>
                <p>Latitude: {this.state.latitude}</p>
                <p>Longitude: {this.state.longitude}</p>
              </div>
            )}
            <div>Note</div>
            <div>
              <Form.Control as="textarea" name="note" value={this.state.note} onChange={(e) => this.handleInputChange(e)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ backgroundColor: '#004e63', outline: 'none' }} type="button" onClick={() => this.handleSaving()}>{this.state.isUpdate ? 'Update' : 'Create'}</Button>
            </div>
            {this.state.isSaved ? <Alert severity='success'>Sample has been saved successfully</Alert> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateSample;
