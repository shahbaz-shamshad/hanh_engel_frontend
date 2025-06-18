import React from 'react';
import Modal from './ui/Modal';
import '../css/InfoModal.css';

const InfoModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Warum fragen wir danach?"
      buttonText="Verstanden"
    >
      <div className="info-modal-content">
        <p>
          This logo will be shown to only your clients with whom you share your survey link.
          While you are sharing your survey to your clients they will see this logo as the very first page.
        </p>
        
        <p>
          Seeing the familiar logo adds feature of authentication and reliability to the surveyees.
        </p>
        
        <p>
          This logo will be used as your profile picture by default and you can change it later.
        </p>
      </div>
    </Modal>
  );
};

export default InfoModal;