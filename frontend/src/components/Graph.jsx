import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';


const Graph = () => {
    
  const data = Array.from({length: 50}, (_, i) => ({
    name: `Day ${i+1}`, 
    value: Math.random() * 1000
  }));

  return (
    <div style={{ 
      width: '500px', 
      height: '400px', 
      overflow: 'auto'
    }}>
      <ResponsiveContainer width={data.length * 80} height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <ReferenceLine 
            x="Day 25"  // Specify the exact point
            stroke="yellow" 
            strokeDasharray="3 3"  // Makes it dotted
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph