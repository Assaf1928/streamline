import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './HOC/Home/Home'
import SampleDetails from './HOC/SampleDetails/SampleDetails';
import SampleQR from './HOC/SampleQR/SampleQR';
import SampleDetailsSum from './HOC/SampleDetailsSum/SampleDetailsSum';
import SamplePrintQR from './HOC/SamplePrintQR/SamplePrintQR';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/SampleDetails' element={< SampleDetails />}></Route>
          <Route exact path='/SampleQR' element={< SampleQR />}></Route>
          <Route exact path='/SampleDetailsSum' element={< SampleDetailsSum />}></Route>
          <Route exact path='/SamplePrintQR' element={< SamplePrintQR />}></Route>
   </Routes>
</Router>
);

