import React from 'react'
import {firestore} from "../firebase.js"
import './Scan.css';
import {addDoc, getDocs, collection, doc, setDoc} from "@firebase/firestore"
import  { Component }  from 'react';
import {TubeTypes} from '../Consts/TubesTypes.js'
import {Col,Row,Form, Button, Card} from 'react-bootstrap';
import axios from 'axios'
import {AiFillCamera} from 'react-icons/ai'



class Scan extends Component {
    constructor(props) {
      super(props);
      this.handleInputChange = this.handleInputChange.bind(this);

      this.state = {

      };
    }

   async  componentDidMount() {
    }
  
    componentWillUnmount() {
    }
    

    handleInputChange() {
    }
  

    render() {

        return (
            <div>
                <div className='header_scan'></div>
                <div className='pic_circle'><div className='icon_container'>
                     <AiFillCamera/></div></div>
                <div style={{textAlign: 'center'}}>Scan the QR on the bottle</div>
            </div>
          );
        }
    }

  export default Scan;
