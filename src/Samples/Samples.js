import React from 'react'
import {firestore} from "../firebase.js"
import  { Component }  from 'react';
import './Samples.css'
import {getDocs, collection} from "@firebase/firestore"
import {Spots} from '../Consts/Spots'
import { Table } from 'react-bootstrap';
import { Button, Modal } from 'react-bootstrap'
import CreateQR from '../Dashboard/Items/CreateQR.js';

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
        const ref =  collection(firestore,"samples");
        let querySnapshot = await getDocs(ref)
        let newSamplesArray = []
        querySnapshot.forEach((doc) => {
         let docData = doc.data()
         let spot = Spots.find(s=>s.id == docData.spotId)
         docData ={
            ...docData,
            spotName: spot ? spot.name : 'Spot Not Defined'
         }
         console.log(docData.name)
         docData.time = 'hii'// new Date(docData.time).toISOString().substring(0,10)
         console.log(docData.time)
         newSamplesArray.push(docData);
        });

        newSamplesArray.sort(function(a,b){
         // Turn your strings into dates, and then subtract them
         // to get a value that is either negative, positive, or zero.
         return new Date(b.time) - new Date(a.time);
       });
        this.setState({samples: newSamplesArray})
      
    }

    handleClose() {
      this.setState({show: false})
    }

    openDialog(id) {
      console.log(id)
      this.setState({id: id, show: true})
      console.log(this.state.show)
    }

  
    componentWillUnmount() {
    }
  
    
  
    render() {
            if(this.state.samples) {
      return (
         <div>
      <Table className='table_margin' striped bordered hover>        
        <thead className='tr' ><tr><th>#</th><th>Name</th><th>Spot</th><th>Location</th><th>Temperature</th><th>Edit</th><th>Tubes</th><th>Tube QR</th></tr></thead>
        <tbody>
        {
           this.state.samples.map( (sample, i) => {
              return <tr className='tr' key={sample.id}><td>{i}</td><td>{sample.name ? sample.name : ' Sample ' + sample.id}</td>
              <td>{ sample.spotName}</td><td>Location</td><td>{sample.temperature}</td>
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
        <Modal.Body><CreateQR tube={true}/></Modal.Body>
        <Modal.Footer>
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
