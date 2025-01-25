import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Graph = () => {
    
    const data = [
        { name: 'Jan', sales: 4000, users: 2400 },
        { name: 'Feb', sales: 3000, users: 1398 },
        { name: 'Mar', sales: 2000, users: 9800 },
        { name: 'Apr', sales: 2780, users: 3908 },
        { name: 'May', sales: 1890, users: 4800 },
        { name: 'Jun', sales: 2390, users: 3800 }
    ];

  return (
    <div>
      <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
        </LineChart>
    </div>
  )
}

export default Graph