import React from "react";

interface ModalProps {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, showModal, setShowModal }) => {

  const modalRef = React.useRef<HTMLDivElement>(null);
  const modalContentRef = React.useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    console.log('handleCloseModal')
    setShowModal(false);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalContentRef.current?.contains(e.target as Node)) {
      return; // Click inside the modal content, do nothing
    }
    handleCloseModal(); // Click outside the modal content, close the modal
  };

  return (
    <>
      {showModal && (
      <div
        ref={modalRef}
        id="staticModal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 flex items-center justify-center w-scren h-screen z-50"
        onClick={handleOutsideClick}
      >
        {/* closable modal */}
        <div className="fixed inset-0 transition-opacity w-scree h-screen z-40" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>


        <div ref={modalContentRef} className="z-50 relative bg-white rounded-lg shadow w-128 max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            className="absolute top-0 right-4 text-2xl text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            onClick={handleCloseModal}
          >
            &times;
          </button>

          {/* Modal body */}
          {children}
        </div>
      </div>
      )}
    </>
  );
};


export default Modal;
