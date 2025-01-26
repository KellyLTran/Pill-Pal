import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import useMedicationStore from '../hooks/medicationStore';

const AddEntryModal = ({ isModalVisible, setIsModalVisible }) => {
  const {
    selectedMed,
    setSelectedMed,
    selectedTime,
    setSelectedTime,
    allMeds,
    recordEntry,
  } = useMedicationStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMed || !selectedTime) {
      alert('Please select a medication and time.');
      return;
    }
    recordEntry(); // Record entry using global state
    setIsModalVisible(false); // Close modal after submission
  };

  return (
    <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="text-xl font-bold text-gray-800">Add Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">Select Medication</Form.Label>
            <div className="flex overflow-x-auto space-x-4 p-2">
              {allMeds.map((med) => (
                <div
                  key={med._id}
                  onClick={() => setSelectedMed(med._id)}
                  className={`flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer ${
                    selectedMed === med._id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={med.imageUrl || 'default-medication-image.png'} // Replace with your image URL or default
                    alt={med.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <span className="mt-2 text-sm text-center">{med.name}</span>
                </div>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">Select Time</Form.Label>
            <Form.Control
              type="time"
              value={selectedTime || ''}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Record Entry
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEntryModal;