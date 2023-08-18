import React, { useState } from 'react';
import { clearPaymentData, deletePayment } from '../../utils/paymentApiFunctions';
import './PaymentDeletion.css';

function PaymentDeletion() {
  const [paymentId, setPaymentId] = useState('');

  const handleDeleteAll = async () => {
    try {
      await clearPaymentData();
      alert('All payment entries deleted successfully!');
    } catch (error) {
      console.error('Error deleting all payment entries:', error);
      alert('Error deleting payment entries. Please try again.');
    }
  };

  const handleDeleteSingle = async () => {
    if (!paymentId) {
      alert('Please enter a payment ID.');
      return;
    }

    try {
      await deletePayment(parseInt(paymentId));
      alert(`Payment entry with ID ${paymentId} deleted successfully!`);
      setPaymentId('');
    } catch (error) {
      console.error(`Error deleting payment entry with ID ${paymentId}:`, error);
      alert(`Error deleting payment entry with ID ${paymentId}. Please try again.`);
    }
  };

  return (
    <div className="payment-deletion-container">
      <h1 id="payment-submit-header" style={{fontFamily:"Futura"}}>Delete Payment(s)</h1>
      <div id="delete-buttons-div" className="text-center">
        <div className="single-deletion">
          <div className="payment-label">Enter Payment ID:</div>
          <input
            type="number"
            className="payment-id-input"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            placeholder="Payment ID"
            min="0"
          />
          <button className="delete-single-button" onClick={handleDeleteSingle}>
            Delete Single Payment
          </button>
        </div>
        <hr />
        <button className="delete-all-button" onClick={handleDeleteAll}>
          Delete All Payment Entries
        </button>
      </div>
    </div>
  );
}

export default PaymentDeletion;
