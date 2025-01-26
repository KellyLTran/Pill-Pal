import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useUserStore from '../hooks/userStore';

const History = () => {
  const { user, userEntries, fetchUserEntries, deleteUserEntry } = useUserStore();

  // Fetch user entries and medication mapping
  useEffect(() => {
    if (user) {
      fetchUserEntries(user._id);
    }
  }, [user, fetchUserEntries]);

  // Handle entry deletion
  const handleDeleteEntry = async (entryID) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      await deleteUserEntry(user._id, entryID);
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
              <div>{entry.medication.name || 'Unknown Medication'}</div>
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