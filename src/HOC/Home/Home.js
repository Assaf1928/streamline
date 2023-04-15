import React from 'react'
import './Home.css';
import StreamLineLogo from '../../images/stream_line.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Button,Row,Col, Container} from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react';
function Home() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [register,setRegister] = useState(false);
  const HandleClick = () =>
  {
    if(register) {
        axios.post(`${process.env.REACT_APP_BACKEND_ROUTE}/register`, {email: email, password: password}).then((res) => {
          alert('Registered Successful!')
          setRegister(false)
          setEmail('')
          setPassword('')
        }).catch((e) => {
          alert('Something went wrong')
          localStorage.removeItem('user')
        });
      }
     else {
      axios.post(`${process.env.REACT_APP_BACKEND_ROUTE}/login`, {email: email, password: password}).then((res) => {
        alert('Login Successful!')
        localStorage.setItem('user', JSON.stringify(res.data));
        window.location.href ="/dashboard/samples"

      }).catch((e) => {
        alert('Wrong Password Or Email ! Try Again')
        localStorage.removeItem('user')
      });
    }
  }

  return (
    <div className='ct'>
      <div className='input_containers'>
        <img src={StreamLineLogo} className="stream_line_logo"/></div>
      <div className='col_inputs'>
      <div className='text_header'>{ register ? 'Register' : 'Login'}</div>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Email"
          aria-label="Email"
          className='input_home'
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Password"
          aria-label="password"
          value={password}
          className='input_home'
          aria-describedby="basic-addon1"
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </InputGroup>
      <InputGroup className='mb-3'>
      <div> Welcome To Streamline! Don't have a user? <span className='cursor' onClick={() => setRegister(true)}> Register</span> Here</div>
      </InputGroup>
      <InputGroup className="mb-3">
       <Button  onClick={() => HandleClick()} className='btn_login'> { register ? 'Register' : 'Login'}</Button>
      </InputGroup></div>
      </div>

  );
}

export default Home;