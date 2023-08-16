import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { submitPaymentData } from '../../utils/paymentApiFunctions';
import './PaymentSubmission.css';

function PaymentSubmission() {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [studentName, setStudentName] = useState('');
  const [paymentDollarAmount, setPaymentDollarAmount] = useState('');
  const [paymentCentAmount, setPaymentCentAmount] = useState('');

  const handlePaymentSubmit = async () => {
    if (!studentName || !paymentDollarAmount || !paymentCentAmount) {
      alert('Please fill in all fields.');
      return;
    }

    const paymentData = {
      paymentDate,
      studentName,
      paymentDollarAmount: parseInt(paymentDollarAmount),
      paymentCentAmount: parseInt(paymentCentAmount),
    };

    try {
      await submitPaymentData(paymentData);
      window.location.reload();
      clearInputs();
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Error submitting payment. Please try again.');
    }
  };

  const clearInputs = () => {
    setPaymentDate(new Date());
    setStudentName('');
    setPaymentDollarAmount('');
    setPaymentCentAmount('');
  };

  return (
    <div className="payment-container">
      <h1 className="payment-submit-header">Submit Payment</h1>
      <form className="payment-form">
        <div className="payment-label">Payment Date:</div>
        <DatePicker
          selected={paymentDate}
          onChange={(date) => setPaymentDate(date)}
          className="payment-date-picker"
        />

        <div className="payment-label">Student Name:</div>
        <input
          type="text"
          className="payment-input-field"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <div className="payment-label">Payment Amount:</div>
        <div className="payment-amounts">
          <input
            type="number"
            className="payment-input-field"
            value={paymentDollarAmount}
            onChange={(e) => setPaymentDollarAmount(e.target.value)}
            min="0"
            placeholder="Dollars"
          />
          <span className="dot">.</span>
          <input
            type="number"
            className="payment-input-field"
            value={paymentCentAmount}
            onChange={(e) => setPaymentCentAmount(e.target.value)}
            min="0"
            placeholder="Cents"
          />
        </div>

        <button type="button" className="payment-submit-button" onClick={handlePaymentSubmit}>
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default PaymentSubmission;