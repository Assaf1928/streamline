import React, { useState } from 'react';
import './CreateQR.css';
import {QRCodeSVG} from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';


function CreateQR() {
  const [value, setValue] = useState(0);
  let x = uuidv4();

  function PrintElem()
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
      mywindow.close();
  }
  let string = `http://localhost:3000/create-sample/${x}`
  return (
    <div className='qr_creation_container'>
      <div id="QR">
         <QRCodeSVG value={string} />
         </div>
         <div>Sample ID: {x} </div>
         <div>Link : {string}</div>
         <div>
         <div><input type="radio" name="Size" /> Large</div>
         <div><input type="radio" name="Size" /> Small</div>
         </div>
         <div><input onChange={e => setValue(e.target.value)} type="number"/> Quantity</div>
         <div>

      <button value="print" onClick={PrintElem}>Create</button>
         </div>
   </div>
  );
}

export default CreateQR;