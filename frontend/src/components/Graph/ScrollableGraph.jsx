import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import 'chartjs-adapter-date-fns'; // For date formatting

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const testGraphData = 
[{date: '2/2/2025, 2:06:52 PM', intensity: 0},

{date: '2/2/2025, 3:06:52 PM', intensity: 0.22},

{date: '2/2/2025, 4:06:52 PM', intensity: 0.44},
 
{date: '2/2/2025, 5:06:52 PM', intensity: 0.67},

{date: '2/2/2025, 6:06:52 PM', intensity: 0.89},
 
{date: '2/2/2025, 7:06:52 PM', intensity: 0.94},
 
{date: '2/2/2025, 8:06:52 PM', intensity: 1},
 
{date: '2/2/2025, 9:06:52 PM', intensity: 0.89},
 
{date: '2/2/2025, 10:06:52 PM', intensity: 0.78},
{date: '2/3/2025, 12:06:52 AM', intensity: 0.72},
 
{date: '2/3/2025, 2:06:52 AM', intensity: 0.67},

{date: '2/3/2025, 4:06:52 AM', intensity: 0.61},

{date: '2/3/2025, 6:06:52 AM', intensity: 0.56},

{date: '2/3/2025, 8:06:52 AM', intensity: 0.39},

{date: '2/3/2025, 10:06:52 AM', intensity: 0.22},
{date: '2/3/2025, 12:06:52 PM', intensity: 0.16},
{date: '2/3/2025, 2:06:52 PM', intensity: 0.11}]

const testSleepDate = '2/3/2025, 10:06:52 AM';

const ScrollableGraph = ({ graphData = testGraphData, sleepDate = testSleepDate }) => {
  // Ensure that graphData is in the expected format
  if (!graphData || !Array.isArray(graphData)) {
    return <div>No data available</div>;
  }

  console.log('Raw Graph Data:', graphData);
  console.log('Sleep date: ', sleepDate);

  // Sort data by date
  const sortedGraphData = graphData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate min and max dates with 3 days offset
  const minDate = new Date(sortedGraphData[0]?.date);
  const maxDate = new Date(sortedGraphData[sortedGraphData.length - 1]?.date);
  const minDateWithOffset = new Date(minDate.getTime() - 3 * 24 * 60 * 60 * 1000);
  const maxDateWithOffset = new Date(maxDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  const currentTime = new Date(); // Current time

  // Convert graphData to Chart.js format
  const chartData = {
    labels: sortedGraphData.map(data => new Date(data.date)), // Dates as labels
    datasets: [
      {
        label: "Activity Level",
        data: sortedGraphData.map(data => ({ x: new Date(data.date), y: data.intensity })), // Map to {x, y} format
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  console.log('Chart Data Labels:', chartData.labels);
  console.log('Chart Data Points:', chartData.datasets[0].data);
  console.log('Min Date:', minDate);
  console.log('Max Date:', maxDate);
  console.log('Min Date w offset:', minDateWithOffset);
  console.log('Max Date w offset:', maxDateWithOffset);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "MMM d, yyyy HH:mm",
        },
        title: {
          display: true,
          text: "Date",
        },
        min: minDateWithOffset,
        max: maxDateWithOffset,
      },
      y: {
        title: {
          display: true,
          text: "Activity Level",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
      annotation: {
        annotations: {
          currentTimeLine: {
            type: 'line',
            xMin: currentTime.getTime(),
            xMax: currentTime.getTime(),
            borderColor: 'green',
            borderWidth: 2,
            label: {
              content: 'Current Time',
              enabled: true,
              position: 'top'
            }
          },
          sleepTimeLine: {
            type: 'line',
            xMin: new Date(sleepDate).getTime(),
            xMax: new Date(sleepDate).getTime(),
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: 'Sleep Time',
              enabled: true,
              position: 'top'
            }
          }
        }
      }
    },
  };

  console.log('Chart Options:', options);

  const daysRange = (maxDateWithOffset - minDateWithOffset) / (1000 * 60 * 60 * 24);
  const width = daysRange * 200; // 200 pixels per day

  return (
    <div style={{ width: "100%", overflowX: "scroll" }}>
      <div style={{ width: `${width}px`, height: "400px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ScrollableGraph;
