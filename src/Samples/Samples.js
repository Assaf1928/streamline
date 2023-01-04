import React from 'react'
import {firestore} from "../firebase.js"
import './Samples.css';
import  { Component }  from 'react';
import {getDocs, collection} from "@firebase/firestore"
import {Spots} from '../Consts/Spots'


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
         docData.time = new Date(docData.time).toISOString().substring(0,10)
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
        <div class="flex_column_samples"> 
        <div class="flex_row_samples table_header"><div>Id</div><div></div><div>spotId</div><div>Time</div><div>Location</div><div>Temperature</div><div>Edit</div><div>Tubes</div></div>
        {
           this.state.samples.map(function (sample, i) {
              return <div class="flex_row_samples" key={sample.id}><div>{sample.id}</div><div>{sample.name}</div><div>{ sample.spotName}</div><div> {sample.time}</div><div>Location</div><div>{sample.temperature}</div><div><button onClick={() => {window.location.href ="/dashboard/create-sample/" + sample.id}}>Edit</button></div><div><button onClick={() =>  {window.location.href ="/dashboard/samples/" + sample.id + "/tubes"}}>Tubes</button></div></div> 
           })
        }
   </div>
      );
    }
}
  }

  export default Samples;
