import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Brush,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

const Graph = ({ graphData, sleepDate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Log graphData, sleepDate, and currentTime for debugging
  console.log('Graph Data:', graphData);
  console.log('Sleep Date:', sleepDate);
  console.log('Current Time:', currentTime);

  // Update currentTime every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Format the X-axis ticks
  const formatXAxis = (tickItem) => {
    try {
      const date = new Date(tickItem);
      return format(date, 'MM/dd/yyyy hh:mm a');
    } catch (error) {
      console.error('Invalid date:', tickItem, 'Error:', error);
      return tickItem; // Return the original tickItem if it's invalid
    }
  };

  const enrichedGraphData = sleepDate 
  ? [...graphData].sort((a, b) => new Date(a.date) - new Date(b.date))
      .reduce((acc, item) => {
        if (new Date(item.date) > sleepDate && !acc.some(i => i.date === sleepDate.toISOString())) {
          acc.push({ 
            date: sleepDate.toISOString(), 
            intensity: 0 
          });
        }
        acc.push(item);
        return acc;
      }, [])
  : graphData;


  return (
    <div className="flex-3 p-4 w-3/4 overflow-x-auto bg-gray-50 rounded-lg shadow-md">
      <div className="">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={enrichedGraphData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Brush dataKey="date" height={30} stroke="#8884d8" travellerWidth={30} />
            <Bar dataKey="intensity" fill="#8884d8" />

            {/* Reference line for sleep time */}
            {sleepDate && (
              <ReferenceLine
                x={sleepDate.toISOString()} // Convert sleepDate to ISO string
                stroke="red"
                label={{ value: 'Sleep Time', position: 'top' }}
              />
            )}

            {/* Reference line for current time */}
            <ReferenceLine
              x={currentTime.toISOString()} // Convert currentTime to ISO string
              stroke="green"
              label={{ value: 'Current Time', position: 'top' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;