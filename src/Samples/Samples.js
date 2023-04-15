import React from 'react'
import {firestore} from "../firebase.js"
import  { Component }  from 'react';
import './Samples.css'
import {getDocs, collection} from "@firebase/firestore"
import {Spots} from '../Consts/Spots'
import { Table } from 'react-bootstrap';
import { Button, Modal } from 'react-bootstrap'
import CreateQR from '../Dashboard/Items/CreateQR.js';
import axios from 'axios';
import moment from 'moment'

class Samples extends Component {

   constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
      this.openDialog = this.openDialog.bind(this);
      this.state = {
         samples:undefined,
         show: false,
         id: undefined,
      };
      
    }
   async  componentDidMount() {
        this.fetchData()
    }

    handleClose() {
      this.setState({show: false})
    }

    openDialog(id) {
      console.log(id)
      this.setState({id: id, show: true})
      console.log(this.state.show)
    }

    fetchData() {
      axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/samples`).then((res) => {
          this.setState({samples: res.data.vm})
      })
  }
    componentWillUnmount() {
    }
  
    
  
    render() {
            if(this.state.samples) {
      return (
         <div>
      <Table className='table_margin' striped bordered hover>        
        <thead className='tr' ><tr><th>#</th><th>Name</th><th>Time</th><th>Location</th><th>Edit</th><th>Tubes</th><th>Tube QR</th></tr></thead>
        <tbody>
        {
           this.state.samples.map( (sample, i) => {
              return <tr className='tr' key={sample.id}><td>{i + 1}</td><td>{sample.user}</td><td>{moment(sample.date).format('DD/MM/yy HH:mm')}</td>
              <td>{sample.location}</td>
              <td><Button onClick={() => {window.location.href ="/dashboard/create-sample/" + sample.id}}>Edit</Button></td>
              <td><Button onClick={() =>  {window.location.href ="/dashboard/samples/" + sample.id + "/tubes"}}>Tubes</Button></td>
              <td><Button onClick={() => this.openDialog(sample.id)}> QR</Button>
              </td>
              </tr> 
           })
        }
        </tbody>
   </Table>
     <Modal show={this.state.show} onHide={() => this.handleClose()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Tube QR</Modal.Title>
        </Modal.Header>
        <Modal.Body><CreateQR id={this.state.id} tube={true}/></Modal.Body>
        <Modal.Footer>
        {this.state.id}

          <Button variant="secondary" onClick={() => this.handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
      );
    }
}
  }

  export default Samples;
