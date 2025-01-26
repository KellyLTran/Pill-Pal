import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import useMedicationStore from '../hooks/medicationStore';
import { FaCapsules, FaPills, FaTablets } from 'react-icons/fa';

const AddEntryModal = ({ isModalVisible, onClose, onSubmit }) => {
  const {
    selectedMed,
    setSelectedMed,
    selectedTime,
    setSelectedTime,
    allMeds,
    recordEntry,
  } = useMedicationStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMed || !selectedTime) {
      alert('Please select a medication and time.');
      return;
    }
    await recordEntry(); // Ensure recordEntry is awaited
    setSelectedMed(''); // Reset selectedMed state
    setSelectedTime(''); // Reset selectedTime state
    onSubmit(); // Notify parent component of successful submission
  };

  const handleClose = () => {
    setSelectedMed(''); // Reset selectedMed state
    setSelectedTime(''); // Reset selectedTime state
    onClose(); // Notify parent component to close the modal
  };

  const getMedicationIcon = (med) => {
    if (med.name.toLowerCase().includes('vyvanse')) {
      return med.release === 'IR' ? (
        <FaPills className="w-12 h-12 text-blue-500" />
      ) : (
        <FaCapsules className="w-12 h-12 text-green-500" />
      );
    } else {
      return <FaTablets className="w-12 h-12 text-gray-500" />;
    }
  };

  const getMedicationColor = (med) => {
    if (med.name.toLowerCase().includes('vyvanse')) {
      return med.release === 'IR' ? 'bg-blue-100' : 'bg-green-100';
    } else {
      return 'bg-gray-100';
    }
  };

  return (
    <Modal show={isModalVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-xl font-bold text-gray-800">Add Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body className="max-h-96 overflow-y-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="block text-sm font-medium text-gray-700 mb-2">Select Medication</Form.Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allMeds.map((med) => (
                <div
                  key={med._id}
                  onClick={() => setSelectedMed(med._id)}
                  className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer ${
                    selectedMed === med._id ? 'border-blue-600' : 'border-gray-300'
                  } ${getMedicationColor(med)}`}
                >
                  {getMedicationIcon(med)}
                  <span className="mt-2 text-sm text-center">
                    {med.name}: {med.dosage} {med.release}
                  </span>
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