import React from 'react'
import {firestore} from "../firebase.js"
import './Tubes.css';
import {addDoc, getDocs, collection, doc, setDoc} from "@firebase/firestore"
import  { Component }  from 'react';
import {TubeTypes} from '../Consts/TubesTypes.js'


class Tubes extends Component {
    constructor(props) {
      super(props);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSaving = this.handleSaving.bind(this);
    this.duplicateTube = this.duplicateTube.bind(this);
    this.deleteTube = this.deleteTube.bind(this);
      this.state = {
         tubes:[{
            id: 1,
            name: 'BOD',
            value: '',
            type: TubeTypes.BOD
         },
        {
            id: 2,
            name: 'COD',
            value: '',
            type: TubeTypes.COD
        }],
        dbId: undefined
      };
    }

   async  componentDidMount() {
    const ref = collection(firestore,"samples");
    const url = window.location.href;
    let splitUrl = url.split('/')
    let lastIndex = splitUrl.length - 2;
    console.log(splitUrl[lastIndex])
    if(splitUrl) {

    let id =  splitUrl[lastIndex]
    let querySnapshot = await getDocs(ref)
    let newSamplesArray = []
    querySnapshot.forEach((doc) => {
        newSamplesArray.push({dbId: doc.id, ...doc.data()});
    });
    let existsInDb = newSamplesArray.find(r=>r.id == id)
    if(existsInDb) {
        this.setState({dbId: existsInDb.dbId})
    if(existsInDb.tubes && existsInDb.tubes.length > 0) {
        this.setState({tubes: existsInDb.tubes})
    }
    }
}
    }
  
    componentWillUnmount() {
    }
    duplicateTube(tube) {
        if(tube) {
            console.log(tube)
        let lastTube = this.state.tubes[this.state.tubes.length -1]
        if(lastTube) {
            let newId = lastTube.id + 1;
           let currentTubesArray =  this.state.tubes
           currentTubesArray.push( {
                id: newId,
                name: tube.name,
                value: '',
                type: tube.type
            })
            this.setState({tubes: currentTubesArray})
            console.log(currentTubesArray)
        }
    }
    }
    deleteTube(tube) {
    let updatedArray = this.state.tubes
    updatedArray.pop(x=>x.id == tube.id)
    this.setState({tubes: updatedArray})

    }
    async handleSaving() {
      if(this.state.dbId) {
      const docRef = doc(firestore, "samples",  this.state.dbId)
      console.log(docRef)
      let tubes = this.state.tubes
      console.log(tubes)
      await setDoc(docRef,{tubes: tubes}, {merge: true})
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
            <div key={ tube.id }>
                <div>{tube.name}</div>
                <input
                    name={ tube.id }
                    value= {tube.value}
                    onChange={ this.handleInputChange }
                />
                <span onClick={ () => this.duplicateTube(tube)}>+</span>
                <span onClick={ () => this.deleteTube(tube)}>-</span>
            </div>
        )
    }

    render() {

        return (
            <div>
            {
                
            this.state.tubes.map(this.renderInput)
            }
            <button onClick={() => this.handleSaving()}>Save</button>
       </div>
          );
        }
  }

  export default Tubes;
