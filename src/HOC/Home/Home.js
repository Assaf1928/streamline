import './Home.css';
import { FaPlusCircle  } from 'react-icons/fa';
import StreamLineLogo from '../../images/stream_line.png';

function Home() {
  return (
    <div className="App">
      <div className='stream_line_container'>
        <div  className='x'>
      <img src={StreamLineLogo} className="stream_line_logo"/>
      </div>
      </div>
     <div className="plus_circle_container"> <div><FaPlusCircle /></div>
     <div>Add New Sample</div></div>
    </div>
  );
}

export default Home;