import './SamplePrintQR.css';
import {QRCodeSVG} from 'qrcode.react';



function SampleDetails() {
  return (
    <div className="App">


      <div className='QR_container'>
        <QRCodeSVG value="https://reactjs.org/" />
      </div>
      <div className='inputs_container'>
      
      <div>Select Size</div>
      <input type="radio" value="Large" name="size" /> Large <div></div>
      <input type="radio" value="Female" name="size" /> Small
      

      <div>Select Quantity:</div>
      <input type="number" id="points" name="points" min="0" max="20" />
      </div>
      <div className='btn_container'>
      <button className='save_button'>Print</button>
      </div>
    </div>
  );
}

export default SampleDetails;
