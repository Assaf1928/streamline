import React from 'react'

import './Dashboard.css';
import  { Component }  from 'react';
import { Link, Outlet } from "react-router-dom";
import {Col, Nav, Row, Tab} from 'react-bootstrap';
class Dashbaord extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.Logout = this.Logout.bind(this);

      this.state = {
        user: null,
        items: [{
            id:1,
            name: "Overview",
            route: "/dashboard/overview"
        },
        {
            id:2,
            name: "Create QR",
            route: "/dashboard/qr-creation"
        },
        {
          id:3,
          name: "Samples",
          route: "/dashboard/samples"
      },
      {
        id:4,
        name: "Users",
        route: "/dashboard/users"
    },
    { id: 5, 
      name: "Locations", 
      route: '/dashboard/locations'
      },
      { id: 6, 
        name: "Tube Types", 
        route: '/dashboard/tube/types'
        }]
      };
    }
  
    componentDidMount() {
      // Subscribe to changes
      let user = localStorage.getItem('user')
      console.log(user)
      if(user) {
        this.setState({user: JSON.parse(user)})
      } else {
        window.location.href = '/'

      }
      
    }
    Logout () {
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    componentWillUnmount() {
      // Clean up listener
    }
  
    handleChange() {
      // Update component state whenever the data source changes
    }
  
    render() {
      return (
        <Tab.Container  id="left-tabs-example" defaultActiveKey="first">
      <Row className='row_limit'>
        
        <Col  className="tabs_container" sm={2}>      
        {console.log(this.state)}
       <div > { this.state.user ?  <div className='welcome'> Welcome Back, {this.state.user.email} </div>  : ''}</div>

        <Nav variant="pills" className="flex-column">
          {this.state.items.map((navitem) => (
            <Nav.Item>
              <div className='tab_route'>
            <a key={navitem.id} href={navitem.route}> {navitem.name} </a>     
            </div>
            </Nav.Item>
          ))}
        </Nav>
        <div key={this.state.user}> { this.state.user ?  <div onClick={() => this.Logout()} className='welcome'> Logout </div>  : ''}</div>

       </Col>
        <Col sm={9}>
        <Outlet/>
        </Col>

        </Row>
        </Tab.Container>
      );
    }
  }

  export default Dashbaord;
