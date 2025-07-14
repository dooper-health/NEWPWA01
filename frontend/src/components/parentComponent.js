import React, { useState } from 'react';
import VaccinationModal from './VaccinationModal';
import Card from './Card';

export default function ParentComponent() {
  const [vaccinationData, setVaccinationData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleVaccinationSubmit = (data) => {
    setVaccinationData(data);
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Vaccination Modal</button>
      {showModal && (
        <VaccinationModal 
          onClose={setShowModal} 
          onSubmit={handleVaccinationSubmit} 
        />
      )}
      {vaccinationData && <Card {...vaccinationData} />}
    </div>
  );
}
