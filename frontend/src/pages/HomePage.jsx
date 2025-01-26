import React, { useEffect, useState } from 'react';
import useMedicationStore from '../hooks/medicationStore';
import useUserStore from '../hooks/userStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Button } from 'react-bootstrap';  // Replace this with the actual button component library you're using
import AddEntryModal from '../components/addEntryModal';
import { axiosInstance } from '../lib/axios';

const HomePage = () => {
  const { fetchAllMeds, recordEntry } = useMedicationStore();
  const { isAuthenticated, user } = useUserStore();
  const [graphData, setGraphData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sleepDate, setSleepDate] = useState(null);

  // Fetch graph data from the backend
  const fetchGraphData = async () => {
    if (!user) return;

    const now = new Date();
    const startDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
    const endDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

    try {
      const response = await axiosInstance.get(`/user/${user._id}/graph`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          currentDate: now.toISOString(),
        }
      });

      const { graphData, sleepDate } = response.data;

      // Format the graph data for Recharts
      const formattedData = graphData.map((entry) => ({
        date: new Date(entry.date).toLocaleTimeString(),
        intensity: entry.intensity,
      }));

      setGraphData(formattedData);
      if (sleepDate) {
        setSleepDate(new Date(sleepDate));
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  // Fetch all medications when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllMeds();
      fetchGraphData();
    }
  }, [isAuthenticated, fetchAllMeds, user]);

  const handleModalClose = async (shouldRefetch = false) => {
    setIsModalVisible(false);
    if (shouldRefetch) {
      await fetchGraphData(); // Refetch the graph data when the modal is closed after saving a new entry
    }
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Your ADHD Tracker</h1>
        <p className="text-lg mt-2">
          Track your medication concentration over time and manage your entries easily.
        </p>
      </div>

      {/* Large Scrollable Graph */}
      <div className="w-full overflow-x-auto bg-gray-50 rounded-lg shadow-md p-6 mb-8">
        <div className="min-w-[1500px] h-[500px]">
          <BarChart
            width={1500} 
            height={500} 
            data={graphData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="intensity" fill="#8884d8" />

            {/* Add a reference line for the sleep date */}
            {sleepDate && (
              <ReferenceLine
                x={new Date(sleepDate).toLocaleTimeString()}
                stroke="red"
                label={{ value: 'Sleep Time', position: 'top' }}
              />
            )}
          </BarChart>
        </div>
      </div>

      {/* Sleep Time Section */}
      <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sleep Time</h2>
        <p>
          You will be able to sleep at: 
          <span className="font-bold">
            {sleepDate ? sleepDate.toLocaleTimeString() : 'Calculating...'}
          </span>
        </p>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Add an Entry?</h2>
        <p className="mb-6">
          Click the button below to record a new medication entry.
        </p>
        <Button
          variant="primary"
          onClick={() => setIsModalVisible(true)} 
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Entry
        </Button>
      </div>

      {/* Add Entry Modal */}
      <AddEntryModal
        isModalVisible={isModalVisible}
        setIsModalVisible={handleModalClose}
      />
    </div>
  );
};

export default HomePage;