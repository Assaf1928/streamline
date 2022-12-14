import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SampleDetails from './HOC/SampleDetails/SampleDetails';
import SampleQR from './HOC/SampleQR/SampleQR';
import SampleDetailsSum from './HOC/SampleDetailsSum/SampleDetailsSum';
import SamplePrintQR from './HOC/SamplePrintQR/SamplePrintQR';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SamplePrintQR />
);

reportWebVitals();
