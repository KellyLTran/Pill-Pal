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
import "chartjs-adapter-date-fns"; // For date formatting

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

const ScrollableGraph = ({ graphData }) => {

  if (!graphData || typeof graphData !== "object") {
    return <div>No data available</div>;
  }

  console.log(graphData)
  // Convert graphData (map of { date: number }) to Chart.js format
  
  
  const chartData = {
    labels: Object.keys(graphData).map((date) => new Date(date)), // Dates as labels
    datasets: [
      {
        label: "Activity Level",
        data: Object.values(graphData), // Numbers as data points
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1, // Smooth line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time", // Use time scale for the x-axis
        time: {
          unit: "day", // Display by day
          tooltipFormat: "MMM d, yyyy", // Tooltip date format
        },
        title: {
          display: true,
          text: "Date",
        },
        min: Object.keys(graphData)[0], // Start of the time period
        max: Object.keys(graphData)[Object.keys(graphData).length - 1], // End of the time period
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
    },
  };

  return (
    <div style={{ width: "100%", overflowX: "scroll" }}>
      <div style={{ width: "2000px", height: "400px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ScrollableGraph;