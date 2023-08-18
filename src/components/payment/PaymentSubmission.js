import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { submitPaymentData } from '../../utils/paymentApiFunctions';
import './PaymentSubmission.css';

function PaymentSubmission() {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [studentID, setStudentID] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  const handlePaymentSubmit = async () => {
    if (!studentID || !paymentAmount) {
      alert('Please fill in all fields.');
      return;
    }

    const paymentData = {
      paymentDate,
      studentID: parseInt(studentID),
      paymentAmount: parseFloat(paymentAmount),
    };

    try {
      await submitPaymentData(paymentData);
      alert('Payment submitted successfully!');
      window.location.reload();
      clearInputs();
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Error submitting payment. Please try again.');
    }
  };

  const clearInputs = () => {
    setPaymentDate(new Date());
    setStudentID('');
    setPaymentAmount('');
  };

  return (
    <div className="payment-container">
      <h1 id="payment-submit-header" style={{fontFamily: "Futura"}}>Submit Payment</h1>
      <form className="payment-form">
        <div className="payment-label">Payment Date:</div>
        <DatePicker
          selected={paymentDate}
          onChange={(date) => setPaymentDate(date)}
          className="payment-date-picker"
          popperPlacement="right-start"
        />

        <div className="payment-label">Student ID:</div>
        <input
          type="number"
          className="payment-input-field"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          min="0"
          placeholder="Student ID"
        />

        <div className="payment-label">Payment Amount:</div>
        <input
          type="number"
          step="0.01"
          className="payment-input-field"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          min="0"
          placeholder="Payment Amount"
        />

        <button type="button" className="payment-submit-button" onClick={handlePaymentSubmit}>
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default PaymentSubmission;
