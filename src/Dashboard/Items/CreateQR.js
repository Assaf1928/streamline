import React, { useState } from 'react';
import './CreateQR.css';
import {QRCodeSVG} from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Button, Form} from 'react-bootstrap'

function CreateQR(props) {
  const [value, setValue] = useState(0);
  const [selectOption, setSelectOption] = useState(0)
  let x = uuidv4();

  const PrintElem = () =>
  {
      let mywindow = window.open('', 'PRINT', 'height=400,width=600');
      let elem = document.getElementById('QR')
      mywindow.document.write('<html>');
      mywindow.document.write('<body >');
      for(let i = 0; i< value; i++) {
      mywindow.document.write("<br/>" + elem.innerHTML + "<br/>");
      mywindow.document.write("<br/>")
      mywindow.document.write(x);
      mywindow.document.write("<br/>" + "<br/>");
      }
  
      mywindow.document.write('</body></html>');
      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/
      mywindow.print();
      //mywindow.close();
  }
  let string = props.tube == false ? `http://localhost:3001/dashboard/create-sample/${x}`: `http://localhost:3001/dashboard/samples/${x}/tubes`
  return (
    <div className='qr_creation_container'>
   <Card className='card_cont' style={{ width: '14rem' }}>
   <div className='qr_container' id="QR">
    <QRCodeSVG value={string} /></div><Card.Body>
        <Card.Title>Generate QR
        </Card.Title>
        <Card.Text>
        Press the button to generate new QR
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><input onChange={e => setValue(e.target.value)} type="number"/></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#"> <Button value="print" onClick={() => PrintElem()}>Create</Button></Card.Link>
      </Card.Body>
    </Card>
   </div>
  );
}

export default CreateQR;