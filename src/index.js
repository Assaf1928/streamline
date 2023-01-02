import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './HOC/Home/Home'
import SampleDetails from './HOC/SampleDetails/SampleDetails';
import SampleQR from './HOC/SampleQR/SampleQR';
import SampleDetailsSum from './HOC/SampleDetailsSum/SampleDetailsSum';
import SamplePrintQR from './HOC/SamplePrintQR/SamplePrintQR';
import Samples from './Samples/Samples.js'
import Dashboard from './Dashboard/Dashboard.js'
import CreateQR from './Dashboard/Items/CreateQR.js'
import CreateSample from './CreateSample/CreateSample'
import Tubes from './Tubes/Tubes'
import Overview from './Overview/Overview'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Routes>
        
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path="/samples/:id/tubes" element={<Tubes/>} />
          <Route path="create-sample/:id" element={<CreateSample/>}/>
          <Route  path="/dashboard" element={<Dashboard/>}>
          <Route  path="qr-creation" element={<CreateQR/>}></Route>
          <Route path="overview" element={<Overview/>}></Route> 
          <Route exact path="samples" element={<Samples/>}></Route>
          <Route exact path="samples/:id/tubes" element={<Tubes/>} />
          <Route path="create-sample/:id" element={<CreateSample/>}/>
          </Route>
          <Route exact path='/SampleDetails' element={< SampleDetails />}></Route>
          <Route exact path='/SampleQR' element={< SampleQR />}></Route>
          <Route exact path='/SampleDetailsSum' element={< SampleDetailsSum />}></Route>
          <Route exact path='/SamplePrintQR' element={< SamplePrintQR />}></Route>
   </Routes>
</Router>
);

