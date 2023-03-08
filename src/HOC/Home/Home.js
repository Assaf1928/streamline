import React from 'react'
import { FaPlusCircle  } from 'react-icons/fa';
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
        axios.post('http://localhost:3000/register', {email: email, password: password}).then((res) => {
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
    console.log(password)
    console.log(email)
      axios.post('http://localhost:3000/login', {email: email, password: password}).then((res) => {
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
      <Container>
    <Row className='row_height'>
      <Col className='input_containers'>
        <img src={StreamLineLogo} className="stream_line_logo"/></Col>
      <Col className='col_inputs'>
      <div className='welcome'> Welcome To Streamline! Don't have a user? <span onClick={() => setRegister(true)}> Register</span> Here</div>
      <InputGroup className="mb-3">
        <InputGroup.Text  id="basic-addon1">Email</InputGroup.Text>
        <Form.Control
          aria-label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text  id="basic-addon1">Password</InputGroup.Text>
        <Form.Control
          aria-label="password"
          value={password}
          aria-describedby="basic-addon1"
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </InputGroup>
      <InputGroup className="mb-3">
       <Button onClick={() => HandleClick()} className='btn_login'> { register ? 'Register' : 'Login'}</Button>
      </InputGroup></Col>
    </Row>

    </Container>
  );
}

export default Home;