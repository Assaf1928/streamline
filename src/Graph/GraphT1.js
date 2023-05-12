import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import  moment  from "moment";
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
console.log(props)
    useEffect(() => {
    
            console.log('PROPS',props)

                let tubes = props.graphData
                let sortedTubesByDate =  tubes.sort((a,b) => new moment(a.sampleId.time).format('YYYYMMDD') - new moment(b.sampleId.time).format('YYYYMMDD'))
                let datesArr = []
                const newArray = sortedTubesByDate.map(obj => {
                if(obj.type == props.type.id) {
                    if(obj && obj.sampleId && obj.sampleId.time) {
                        console.log(obj.sampleId.time)
                    let date = moment(obj.sampleId.time).format('DD/MM/YYYY')
                    console.log(date)
                    if(date) {
                let datesArrObj = datesArr.find(d=> d.date === date)
                if(!datesArrObj) {
                    let arr = [obj.value]
                    datesArr.push({
                        date,
                        arr
                    })
                } else {
                    datesArrObj.arr.push(obj.value)
                }
            }
                }
            }
                });

                let data =[]
                datesArr.forEach((d) =>{  
                    if(d.arr) {
                        let sum = 0
                        
                    d.arr.forEach(v => {
                        
                        sum = sum + v
                    }) 
                    let average = sum / d.arr.length + 1  
                    data.push({name: d.date, [props.type.name] : average})
                }
                

                })
                console.log(data)
                setData(data)
            },[])
 


    return <div>
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
            <XAxis dataKey="name" />
            <YAxis dataKey={props.type.name} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={props.type.name} stroke={getRandomColor()}/>
        </LineChart>
    </div>
}