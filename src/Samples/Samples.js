import React from 'react'
import {firestore} from "../firebase.js"
import  { Component }  from 'react';
import './Samples.css'
import {getDocs, collection} from "@firebase/firestore"
import {Spots} from '../Consts/Spots'
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap'


class Samples extends Component {
   
    constructor(props) {
      super(props);

      this.state = {
         samples:undefined
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
  
    componentWillUnmount() {
    }
  
    
  
    render() {
            if(this.state.samples) {
      return (
      <Table className='table_margin' striped bordered hover>        
        <thead className='tr' ><tr><th>Id</th><th>Name</th><th>Spot</th><th>Location</th><th>Temperature</th><th>Edit</th><th>Tubes</th></tr></thead>
        <tbody>
        {
           this.state.samples.map(function (sample, i) {
              return <tr className='tr' key={sample.id}><td>{sample.id}</td><td>{sample.name ? sample.name : ' Sample ' + sample.id}</td><td>{ sample.spotName}</td><td>Location</td><td>{sample.temperature}</td><td><Button onClick={() => {window.location.href ="/dashboard/create-sample/" + sample.id}}>Edit</Button></td><td><Button onClick={() =>  {window.location.href ="/dashboard/samples/" + sample.id + "/tubes"}}>Tubes</Button></td></tr> 
           })
        }
        </tbody>
   </Table>
      );
    }
}
  }

  export default Samples;
