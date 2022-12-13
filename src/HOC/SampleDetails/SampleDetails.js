import './SampleDetails.css';
import SimpleMap from '../../LOC/Map/MapPOC.js'

function SampleDetails() {
  return (
    <div className="App">
      <div className='select_container'>
      <div>Sample Details:</div>
      <select className="spot_select">
        <option>Choose spot</option>
        <option></option>
      </select>
      </div>
      <div className='inputs'>
      <div className='input_container'>
        <div> 
        <input placeholder='Sample Id'/>
        </div>
        <div> 
        <input placeholder='Sample Id'/>
        </div>
        <div> 
        <input placeholder='Sample Id'/>
        </div>
        <div> 
        <input placeholder='Sample Id'/>
        </div>
      </div>
      </div>
      <SimpleMap/>
      <div className='btn_container'>
      <button className='save_button'>Save</button>
      </div>
    </div>
  );
}

export default SampleDetails;





