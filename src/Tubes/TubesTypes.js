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
        axios.get(`${process.env.REACT_APP_BACKEND_ROUTE}/tubes/types`).then((res) => {
            this.setState({types: res.data.res})
        })
    }
    setAddInput(value) {
        this.setState({name: value})
    }
     handleAdd() {
        if(this.state.name) {

        
        axios.post(`${process.env.REACT_APP_BACKEND_ROUTE}/tubes/types`,({name: this.state.name})).then(() => {
            this.fetchData()
            this.setState({name: ''})

        })
    } else {
        alert('Please fill Input')
    }
      }

    handleDelete(id) {
        axios.delete(`${process.env.REACT_APP_BACKEND_ROUTE}/tubes/types/${id}`).then((res) => {
        this.fetchData()
        })
     }  
  
    
     renderTr = (type, i) => {
        return(<tr><td>{i + 1}</td><td>{type.name}</td>
        {/* <td><Button onClick={() => this.handleDelete(type.id)}> Delete </Button></td> */}
        <td>-</td>
        </tr>)
    }

    render() {

        return (
          <div style={{textAlign: 'center'}}>
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
            <tr><td></td><td><Form.Control value={this.state.name}  onChange={e => this.setAddInput(e.target.value)}/></td>
            <td><Button onClick={() => this.handleAdd()}>Add</Button></td>
            </tr>
      </tbody>
    </Table>

       </div>
          );
        }
  }

  export default TubesTypes;
