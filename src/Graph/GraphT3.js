import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export default function GraphT1(props) {
    const [data, setData] = useState([])
    const [locations, setLocations] = useState(new Set())

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/graph_t1`)
            .then((response) => response.json())
            .then((tubes) => {
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);
    console.log("locations", Array.from(locations));
    console.log("locations set", locations);

    // There is more work here
    return <ResponsiveContainer width="100%" height="50%">
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Array.from(locations).map((l) => {
                return <Line type="monotone" dataKey={l} stroke={getRandomColor()} />
            })}
        </LineChart>
    </ResponsiveContainer>
}