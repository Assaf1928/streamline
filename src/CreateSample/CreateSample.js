import React from 'react'
import {firestore} from "../firebase.js"
import './CreateSample.css';
import  { Component }  from 'react';
import {addDoc, getDocs, collection, doc, setDoc} from "@firebase/firestore"
import {Spots} from '../Consts/Spots'


class CreateSample extends Component {
    constructor(props) {
      super(props);
      this.handleSaving = this.handleSaving.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);

      this.state = {
            id:  undefined,
            temperature: 20,
            location: { 
            latitude: 10,
            longitude: 10
            },
            spotId: 0,
            time: new Date(),
            timeToString: new Date().toISOString().substring(0,10),
            spots: [{id: 0, name: 'none'}],
            isUpdate: false,
            dbId: undefined
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
      if(this.state.id) {
    const ref = collection(firestore,"samples");
    console.log(this.state.isUpdate && this.state.dbId)
    if(this.state.isUpdate && this.state.dbId) {
    const docRef = doc(firestore, "samples",  this.state.dbId)
    await setDoc(docRef,{spotId: this.state.spotId}, {merge: true})
    } else {
      let date = new Date()
      date.setDate(date.getDate()+1);
   await addDoc(ref, {
        id: this.state.id,
        temperature: this.state.temperature,
        spotId: this.state.spotId,
        location: this.state.location,
        time: date.getTime(),
        tubes: []
    })
  }
    alert('Thank You! ')
    window.location.href = '/dashboard/samples'
  }
    }
   async componentDidMount() {
        const ref = collection(firestore,"samples");
        const url = window.location.href;
        this.setState({spots: Spots})
        let splitUrl = url.split('/')
        let lastIndex = splitUrl.length - 1;
        if(splitUrl) {

        let id =  splitUrl[lastIndex]
        let querySnapshot = await getDocs(ref)
        let newSamplesArray = []
        querySnapshot.forEach((doc) => {
            newSamplesArray.push({dbId: doc.id, ...doc.data()});
        });
        let existsInDb = newSamplesArray.find(r=>r.id == id)
        if(existsInDb) {
            this.setState({isUpdate: true, dbId: existsInDb.dbId, spotId: existsInDb.spotId})
        }
        this.setState({id: id}) 
    }
    }
  
    componentWillUnmount() {
      // Clean up listener
    }
  
    
  
    render() {
      let select = "";
      if(this.state && this.state.spots.length > 0 ) {
    select =  <select name="spotId" value={this.state.spotId} onChange={(e) =>  this.handleInputChange(e)}>
      <option value="0"> None</option>
         {this.state.spots.map(spot=> {
          return  <option  key={spot.id} value={spot.id}>{spot.name}</option>
          })}

        </select>
}
      return (
        <div className="form_container">
           <div className="create_title">{ this.state.isUpdate ? 'Update' : 'Create'}  New Sample</div>
           <div>Id</div>
            <div> <input value={this.state.id} disabled /></div>
            <div>
            <div>Location</div>
            {select}
    
            </div>
           <div>Date Time</div>
            <div>
            <input name="time" value={this.state.timeToString} disabled onChange={() => this.handleInputChange} type="date"/>
            </div>
            <div>Temperature</div>
            <div>
            <input value={20} disabled name="temperature" onChange={() => this.handleInputChange} type="number"/>
           </div> 
           <div><button type="button" onClick={() => this.handleSaving()}>{this.state.isUpdate ? 'Update' : 'Create'}</button></div>
        </div>
      );
    }
  }

  export default CreateSample;
