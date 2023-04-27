import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './HomePage.css'

export default function HomePage() {
    const [date, setDate] = useState(new Date());
    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <div>
            <p>Streamline system accompanies the river restoration process and provides an accecible and convinient sulotion for collecting, organizing, saving and analizing the sample data of Kofer river</p>
            <div>Before leaving the field, don't forget to print a QR for all the sampling points</div>
            <div>
                <Link className='link' to='../qr-creation'>Create QR</Link>
                <Link className='link' to='../locations'>Add Location</Link>
                <Link className='link'>Analysis Results</Link>
                <Link className='link'>Lab Results</Link>
                <Link className='link'>Sensor Monitoring</Link>
            </div>
            <div className='wrraper-calendar'>
                <Calendar
                    onChange={handleDateChange}
                    value={date} />
            </div>
        </div>
    )
}