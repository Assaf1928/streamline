import React from 'react'
import {firestore} from "../firebase.js"
import './Tubes.css';
import {addDoc, getDocs, collection, doc, setDoc} from "@firebase/firestore"
import  { Component }  from 'react';
import {TubeTypes} from '../Consts/TubesTypes.js'
import {Col,Row,Form, Button, Card} from 'react-bootstrap';



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
            type: TubeTypes.BOD,
         },
        {
            id: 2,
            name: 'COD',
            value: '',
            type: TubeTypes.COD
        },
        {
            id: 3,
            name: 'TSS',
            value: '',
            type: TubeTypes.TSS
        },
        {
            id: 4,
            name: 'VSS',
            value: '',
            type: TubeTypes.VSS
        },
        {
            id: 5,
            name: 'TN',
            value: '',
            type: TubeTypes.TN
        },
        {
            id: 6,
            name: 'TKN',
            value: '',
            type: TubeTypes.TKN
        },
        {
            id: 7,
            name: 'NH3',
            value: '',
            type: TubeTypes.NH3
        },
        {
            id: 8,
            name: 'TP',
            value: '',
            type: TubeTypes.TP
        },{
            id: 9,
            name: 'PO4',
            value: '',
            type: TubeTypes.PO4
        },{
            id: 10,
            name: 'TDS',
            value: '',
            type: TubeTypes.TDS
        },{
            id: 11,
            name: 'Total Hardness',
            value: '',
            type: TubeTypes.TotalHarddness
        },{
            id: 12,
            name: 'Ikalinity',
            value: '',
            type: TubeTypes.Ikalinity
        },
        {
            id: 13,
            name: 'ICP',
            value: '',
            type: TubeTypes.ICP
        },],
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
                value: 0,
                type: tube.type
            })
            this.setState({tubes: currentTubesArray})
            console.log(currentTubesArray)
        }
    }
    }
    deleteTube(tube) {
    let updatedArray = this.state.tubes
    if(this.state.tubes.filter(t=>t.type == tube.type).length > 1) {
    updatedArray.pop(x=>x.id == tube.id)
    this.setState({tubes: updatedArray})
    } else {
        alert('Cant remove last Tube')
    }

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

            <Card className='card_container'>
            <Card.Header>                        
                <div className='tab_name'>{tube.name}</div>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
              <div key={ tube.id }>
                <div class="mt-4 mb-2">
                    <Row><Col xs lg="1">
                         <Form.Control className="input_width" size="LG" type="number" name={ tube.id }  value= {tube.value} onChange={ this.handleInputChange }  />
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
            <Button onClick={() => this.handleSaving()}>Save</Button>
       </div>
       </div>
          );
        }
  }

  export default Tubes;
