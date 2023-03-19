import React, { useState } from 'react';
import './CreateQR.css';
import {QRCodeSVG} from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Button, Form} from 'react-bootstrap'

function CreateQR(props) {
  const [value, setValue] = useState(1);
  const [selectOption, setSelectOption] = useState(0)
  let x = uuidv4();
 let typesArr = [{
    id: 1,
    name: 'BOD',
 },
{
    id: 2,
    name: 'COD',
},
{
    id: 3,
    name: 'TSS',
},
{
    id: 4,
    name: 'VSS',
},
{
    id: 5,
    name: 'TN',
},
{
    id: 6,
    name: 'TKN',
},
{
    id: 7,
    name: 'NH3',
},
{
    id: 8,
    name: 'TP',
},{
    id: 9,
    name: 'PO4',
},{
    id: 10,
    name: 'TDS',
},{
    id: 11,
    name: 'Total Hardness',
},{
    id: 12,
    name: 'Ikalinity',
},
{
    id: 13,
    name: 'ICP',
}]

  const PrintElem = () =>
  {
      let mywindow = window.open('', 'PRINT', 'height=400,width=600');
      let elem = document.getElementById('QR')
      mywindow.document.write('<html>');
      mywindow.document.write('<body >');
      if(props.tube) {
        typesArr.forEach(t => {
          mywindow.document.write(t.name)
          mywindow.document.write("<br/>" + elem.innerHTML + "<br/>");
          mywindow.document.write("<br/>")
          mywindow.document.write(x);
          mywindow.document.write("<br/>" + "<br/>");
          
        });
      }
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
  console.log(props.tube)
  let string =  props.tube === true ? `http://localhost:3001/dashboard/samples/${x}/tubes` : `http://localhost:3001/dashboard/create-sample/${x}`
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
        <ListGroup.Item><input disabled={props.tube} value={value} onKeyDown="return false" min="1" max="20" onChange={e => setValue(e.target.value)} type="number"/></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#"> <Button value="print" onClick={() => PrintElem()}>Create</Button></Card.Link>
      </Card.Body>
    </Card>
   </div>
  );
}

export default CreateQR;