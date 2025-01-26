import React, { useEffect, useState } from 'react';
import useMedicationStore from '../hooks/medicationStore';
import useUserStore from '../hooks/userStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from 'react-bootstrap';
import AddEntryModal from '../components/addEntryModal'; // Import the new modal component

// Sample data for medication activation
const createSampleConcentrationMap = () => {
  const concentrationMap = new Map();
  const startTime = new Date(); // Start from the current time

  // Simulate concentration over 24 hours
  for (let i = 0; i < 24; i++) {
    const time = new Date(startTime.getTime() + i * 60 * 60 * 1000); // Add hours
    const concentration = Math.sin((i / 24) * Math.PI); // Simulate a sine wave for concentration
    concentrationMap.set(time.toISOString(), Math.abs(concentration)); // Ensure value is between 0 and 1
  }

  return concentrationMap;
};

const sampleConcentrationMap = createSampleConcentrationMap();

const HomePage = () => {
  const { fetchAllMeds } = useMedicationStore();
  const { isAuthenticated } = useUserStore();
  const [graphData, setGraphData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Manage modal visibility in HomePage

  // Fetch all medications when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllMeds();
    }
  }, [isAuthenticated, fetchAllMeds]);

  // Update graph data based on the sample concentration map
  useEffect(() => {
    const data = Array.from(sampleConcentrationMap.entries()).map(([time, concentration]) => ({
      date: new Date(time).toLocaleTimeString(), // Format time for display
      concentration: concentration,
    })); 

    // const data = 
    setGraphData(data);
  }, []);

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Concentration Over Time</h1>

      {/* Large Scrollable Graph */}
      <div className="w-full overflow-x-auto bg-gray-50 rounded-lg shadow-md p-6 mb-8">
        <div className="min-w-[1500px] h-[500px]">
          <BarChart
            width={1500} // Increased width for a larger graph
            height={500} // Increased height for a larger graph
            data={graphData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="concentration" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      {/* Button to Open Modal */}
      <Button
        variant="primary"
        onClick={() => setIsModalVisible(true)} // Open modal
        className="block mx-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add Entry
      </Button>

      {/* Add Entry Modal */}
      <AddEntryModal
        isModalVisible={isModalVisible} // Pass modal visibility as prop
        setIsModalVisible={setIsModalVisible} // Pass setter function as prop
      />
    </div>
  );
};

export default HomePage;