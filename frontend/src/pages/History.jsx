import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { axiosInstance } from '../lib/axios';
import useUserStore from '../hooks/userStore';

const History = () => {
  const { user } = useUserStore();
  const [userEntries, setUserEntries] = useState([]);
  const [pillMapping, setPillMapping] = useState({});

  // Fetch user entries and medication mapping
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user entries
        const entriesResponse = await axiosInstance.get(`/user/${user._id}/history`);
        if (entriesResponse.data && entriesResponse.data.entryHistory) {
          const sortedEntries = entriesResponse.data.entryHistory.sort(
            (a, b) => new Date(b.usedAt) - new Date(a.usedAt)
          );
          setUserEntries(sortedEntries);
        }

        // Fetch medication mapping
        const medsResponse = await axiosInstance.get('/medication/');
        if (medsResponse.data && medsResponse.data.allMedications) {
          const mapping = medsResponse.data.allMedications.reduce((acc, med) => {
            acc[med._id] = med.name;
            return acc;
          }, {});
          setPillMapping(mapping);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  // Handle entry deletion
  const handleDeleteEntry = async (entryID) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axiosInstance.delete(`/entry/${user._id}/${entryID}`);
        // Remove the deleted entry from the local state
        setUserEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== entryID));
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Montserrat',
        backgroundColor: '#ff6b6b',
        minHeight: '100vh',
        padding: '20px',
      }}
      className="flex flex-row items-center justify-center text-center text-white"
    >
      <div
        style={{ width: '40%', minHeight: '80%' }}
        className="p-4 flex flex-col bg-white text-black rounded"
      >
        <h2>Past Dosages</h2>
        {userEntries.length === 0 ? (
          <div>No entries to show</div>
        ) : (
          userEntries.map((entry) => (
            <div
              key={entry._id}
              style={{
                background: 'rgba(240,240,240)',
                boxShadow: '1px 1px 1px rgba(1,1,1,0.4)',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              className="flex flex-row m-2 rounded pl-2"
            >
              <div>{new Date(entry.usedAt).toLocaleDateString()}</div>
              <div>{pillMapping[entry.medication] || 'Unknown Medication'}</div>
              <Button
                style={{ width: '15%' }}
                variant="danger"
                onClick={() => handleDeleteEntry(entry._id)}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;