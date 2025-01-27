import React, { useEffect, useState } from 'react';
import useMedicationStore from '../hooks/medicationStore';
import useUserStore from '../hooks/userStore';
import { Button } from 'react-bootstrap';
import AddEntryModal from '../components/addEntryModal';
import { format } from 'date-fns';
import ScrollableGraph from '../components/Graph/ScrollableGraph.jsx';

const HomePage = () => {
  const { fetchAllMeds } = useMedicationStore();
  const {
    isAuthenticated,
    user,
    refreshUser,
    graphData,
    sleepDate,
    fetchGraphData,
  } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false); // State to trigger re-fetch

  // Fetch all medications and graph data when the user is authenticated or refreshTrigger changes
  useEffect(() => {
    const doThing = async () => {

      if (isAuthenticated && user) {
        await fetchAllMeds();
        await fetchGraphData();
        console.log("graphData:", graphData)
      }
    }

    doThing()
    
  }, [isAuthenticated, user, fetchAllMeds, fetchGraphData, refreshTrigger]);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalSubmit = async () => {
    setIsModalVisible(false);
    setRefreshTrigger((prev) => !prev); // Toggle refreshTrigger to trigger re-fetch
  };

  return (
    <div className="p-5 max-w-10xl h-max">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Your ADHD Tracker</h1>
        <p className="text-lg mt-2">Track your medication concentration over time and manage your entries easily.</p>
      </div>

      <div className="flex">
        <div className="flex-1 p-4 mr-4">
          <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sleep Time</h2>
            <p>
              You will be able to sleep at -{' '}
              <span className="font-bold">
                {sleepDate ? format(sleepDate, 'hh:mm a') : 'Calculating...'}
              </span>
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Add an Entry?</h2>
            <p className="mb-6">Click the button below to record a new medication entry.</p>
            <Button
              variant="primary"
              onClick={() => setIsModalVisible(true)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Entry
            </Button>
          </div>
        </div>

        <ScrollableGraph graphData={graphData}/>
      </div>

      <AddEntryModal
        isModalVisible={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit} // Pass the callback function
      />
    </div>
  );
};

export default HomePage;