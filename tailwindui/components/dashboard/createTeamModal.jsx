import React, { useState } from 'react';
import Modal from '../ui/Modal';

const CreateTeamModal = ({ showModal, setShowModal, onConfirm }) => {
  const [teamName, setTeamName] = useState('');

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm(teamName);
    }
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title="Create Team"
      description="Enter the name of your new team."
      onConfirm={handleConfirm}
      hasInputArea={true}
      inputValue={teamName}
      setInputValue={setTeamName}
      canClose={true}
    >
    </Modal>
  );
};

export default CreateTeamModal;