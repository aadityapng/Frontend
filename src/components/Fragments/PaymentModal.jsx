import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onPrintReceipt }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [isOpen]);

  const handlePrintReceipt = () => {
    onPrintReceipt();
    modalRef.current.close();
    navigate("/products");
  };

  return (
    <dialog
      ref={modalRef}
      className="modal fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="modal-box bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h3 className="font-bold text-lg mb-4">Payment Successful</h3>
        <p className="mb-4">Your payment has been processed successfully.</p>
        <div className="modal-action">
          <button
            className="btn bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
            onClick={handlePrintReceipt}
          >
            Print Receipt
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PaymentModal;
