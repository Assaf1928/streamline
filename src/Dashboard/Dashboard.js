import React from 'react'

import './Dashboard.css';
import  { Component }  from 'react';
import { Link, Outlet } from "react-router-dom";
class Dashbaord extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
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
      }]
      };
    }
  
    componentDidMount() {
      // Subscribe to changes
      console.log('hi')
    }
  
    componentWillUnmount() {
      // Clean up listener
    }
  
    handleChange() {
      // Update component state whenever the data source changes
    }
  
    render() {
      return (
        <div className="dashboard_container">
        <div className="navbar_lefty">
          {this.state.items.map((navitem) => (
           <div><Link key={navitem.id} to={navitem.route}> {navitem.name} </Link></div>
          ))}
        </div>
        <div className="item_container">
        <Outlet/>
        </div>
        </div>
      );
    }
  }

  export default Dashbaord;
