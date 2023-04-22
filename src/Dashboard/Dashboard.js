import React from 'react'
import './Dashboard.css';
import  { Component }  from 'react';
import { Link, Outlet } from "react-router-dom";
import {Col, Nav, Row, Tab} from 'react-bootstrap';
import StreamLineLogo from '../images/stream_line.png';
import {AiFillHome, AiFillFileAdd} from 'react-icons/ai'
import {GiConsoleController, GiDrippingTube} from 'react-icons/all'
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import moment from 'moment'
class Dashbaord extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.Logout = this.Logout.bind(this);
      this.showPosition = this.showPosition.bind(this)

      this.state = {
        user: null,
        date: '',
        temperature: '',
        temperatureText: '',
        items: [{
            id:1,
            name: "Overview",
            route: "/dashboard/overview",
            icon: <AiFillHome/>
        },
        {
            id:2,
            name: "Create QR",
            route: "/dashboard/qr-creation",
            icon:  "" //<BsQrCodeScan/>

        },
        {
          id:3,
          name: "Samples",
          route: "/dashboard/samples",
          icon: <AiFillFileAdd/>

      },
      {
        id:4,
        name: "Users",
        route: "/dashboard/users",
        icon: ""

    },
    { id: 5, 
      name: "Locations", 
      route: '/dashboard/locations',
      icon: ""

      },
      { id: 6, 
        name: "Tube Types", 
        route: '/dashboard/tube/types',
        icon: <GiDrippingTube/>

        }]
      };
    }
  
    componentDidMount() {
      this.getLocation()
      // Subscribe to changes
      let d = new Date()
      let formattedDate = moment(d).format('MM/DD/YYYY')
      this.setState({date: formattedDate})
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
     getLocation() {
      if (navigator.geolocation) {
       let x =  navigator.geolocation.getCurrentPosition(this.showPosition);
       console.log(x)
      } else { 
      alert("Geolocation is not supported by this browser.");
      }
    }
    
     showPosition(position) {
      let key = '8074823d4a0695d0cfaaa796dd6985dd'
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`).then((res) => {
      let text = `Temperature is ${res.data.main.temp} but feels like ${res.data.main.feels_like}.
      the humidity is ${res.data.main.humidity}.`

      console.log(res.data)
      this.setState({temperature: res.data.main.temp, temperatureText: text })
      })

    }
  
    handleChange(x) {
      window.location.href = x
    }
  
    render() {

      const popover = (
        <Popover id="popover-basic">
    <Popover.Header as="h3">Temperature</Popover.Header>
    <Popover.Body>
     {this.state.temperatureText}
    </Popover.Body>
    </Popover>
      )
      return (
      <Row className='row_limit'>
        
        <Col className="col_ct" sm={2}   style={{ display: 'flex', textAlign: 'center' }}>
          <div className='navbar_ct'>
      <div>
        <img src={StreamLineLogo} className="dashboard_logo"/>
        </div>
  {this.state.items.map((navitem) => (
              <div className='tab_ct'><div className='icon_ct'>{navitem.icon}</div>
              <div className='tab_route' 
                    onClick={() => this.handleChange(navitem.route)} 
                    href={navitem.route}> 
                     {navitem.name}</div>
                     </div>
          ))}  
          <hr style={{color: 'white'}}/>
          <div style={{color: 'white'}}>Settings</div>
          <div onClick={() => this.Logout()} style={{color: 'white'}}>Log out</div>
  </div>
  
       </Col>
        <Col sm={9}>
        <div className='navbar'><div style={{marginTop: '10px'}}><span>Welcome, {this.state && this.state.user ? this.state.user.name : ''}</span> </div>
          <div > { this.state.user ?  <div className='welcome'>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}><div>{this.state.temperature} </div></OverlayTrigger> <div><span>&#8451;</span></div>
             <div style={{marginLeft: '60px'}}> {this.state.date}</div> </div>  : ''} </div>

          </div>
        <Outlet/>
        </Col>

        </Row>
      );
    }
  }

  export default Dashbaord;
