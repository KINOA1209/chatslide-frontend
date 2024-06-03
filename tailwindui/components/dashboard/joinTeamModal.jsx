import React, { useState } from 'react';
import Modal from '../ui/Modal';

const JoinTeamModal = ({ showModal, setShowModal, onConfirm }) => {
  const [inviteCode, setInviteCode] = useState('');

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm(inviteCode);
    }
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title="Join Team"
      description="Enter the invite code to join a team."
      onConfirm={handleConfirm}
      hasInputArea={true}
      inputValue={inviteCode}
      setInputValue={setInviteCode}
      canClose={true}
    >
    </Modal>
  );
};

export default JoinTeamModal;
