import React from "react";
import './Sampels.css';
import {QRCodeSVG} from 'qrcode.react';



function Sampels() {
  return (
    <div className="App">
       <div>Temperature</div>
       <div></div>
       <div></div>
       <div></div>
    </div>
  );
}

export default Sampels;

// QR Table
// SCAN QR --> ADD NEW SAMPLE(Temperature(FromDevice),DateTime(FromDevice),Location(FromDevice), Spot, Note) --> SAVE --> SHOW SAMPLES
// SHOW SAMPLES --> ADD TUBE
// SCAN QR -->  ADD Result 

