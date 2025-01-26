import React, { useEffect, useState } from 'react';
import useMedicationStore from '../hooks/medicationStore';
import useUserStore from '../hooks/userStore';
import { Button } from 'react-bootstrap';
import AddEntryModal from '../components/addEntryModal';
import { format } from 'date-fns';
import Graph from '../components/Graph'; // Import your Graph component

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

  // Fetch all medications and graph data when the user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchAllMeds();
      fetchGraphData();
    }
  }, [isAuthenticated, user, fetchAllMeds, fetchGraphData]);

  const handleModalClose = async (shouldRefetch = false) => {
    setIsModalVisible(false);
    if (shouldRefetch) {
      await refreshUser();
      await fetchGraphData();
    }
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

        {/* Use the Graph component and pass props */}
        <Graph graphData={graphData} sleepDate={sleepDate} />
      </div>

      <AddEntryModal
        isModalVisible={isModalVisible}
        setIsModalVisible={handleModalClose}
      />
    </div>
  );
};

export default HomePage;