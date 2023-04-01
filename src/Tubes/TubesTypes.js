import React from 'react'
import  { Component }  from 'react';
import {Table, Button, Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import axios from 'axios'



class TubesTypes extends Component {
    
    constructor(props) {
      super(props);
      this.setAddInput = this.setAddInput.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleDelete = this.handleDelete.bind(this);

      this.state = {
        types:[],
        name: ''
      };
    }

   async  componentDidMount() {
    this.fetchData()
    }
    
    componentWillUnmount() {
    }
    fetchData() {
        axios.get('https://streamline-back.onrender.com/tubes/types').then((res) => {
            this.setState({types: res.data.res})
        })
    }
    setAddInput(value) {
        this.setState({name: value})
    }
     handleAdd() {
        if(this.state.name) {

        
        axios.post('https://streamline-back.onrender.com/tubes/types',({name: this.state.name})).then(() => {
            this.fetchData()
            this.setState({name: ''})

        })
    } else {
        alert('Please fill Input')
    }
      }

    handleDelete(id) {
        axios.delete(`https://streamline-back.onrender.com/tubes/types/${id}`).then((res) => {
        this.fetchData()
        })
     }  
  
    
     renderTr = (type, i) => {
        return(<tr><td>{type.id}</td><td>{type.name}</td><td><Button onClick={() => this.handleDelete(type.id)}> Delete </Button></td></tr>)
    }

    render() {

        return (
            <div>
            <div class="title">Types</div>


            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
            {this.state.types.map(this.renderTr)}
            <tr><td></td><td><Form.Control value={this.state.name}  onChange={e => this.setAddInput(e.target.value)}/></td><td><Button onClick={() => this.handleAdd()}>Add</Button></td></tr>
      </tbody>
    </Table>

       </div>
          );
        }
  }

  export default TubesTypes;
