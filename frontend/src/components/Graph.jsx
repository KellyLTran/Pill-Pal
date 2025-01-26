import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Brush, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const Graph = ({ graphData, sleepDate }) => {
  const formatXAxis = (tickItem) => {
    try {
      const date = new Date(tickItem);
      return format(date, 'MM/dd/yyyy hh:mm a');
    } catch (error) {
      console.error('Invalid date:', tickItem, 'Error:', error);
      return tickItem; // Return the original tickItem if it's invalid
    }
  };

  return (
    <div className="flex-3 p-4 w-3/4 overflow-x-auto bg-gray-50 rounded-lg shadow-md">
      <div className="">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={graphData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Brush dataKey="date" height={30} stroke="#8884d8" travellerWidth={30} />
            <Bar dataKey="intensity" fill="#8884d8" />
            {sleepDate && (
              <ReferenceLine
                x={new Date(sleepDate).toLocaleString()}
                stroke="red"
                label={{ value: 'Sleep Time', position: 'top' }}
              />
            )}

            {/* Reference line for sleep time */}
            {sleepDate && (
              <ReferenceLine
                x={sleepDate.getTime()} // Sleep time as a timestamp
                stroke="red"
                label={{ value: 'Sleep Time', position: 'top' }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;