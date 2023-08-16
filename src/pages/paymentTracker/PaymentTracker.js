import React, { useState, useEffect } from 'react';
import PaymentSubmission from '../../components/payment/PaymentSubmission'
import PaymentRecords from '../../components/payment/PaymentRecords'
import './PaymentTracker.css';

function PaymentTracker() {
  return (
    <div className="payment-tracker">
      <PaymentSubmission />
      <PaymentRecords />
    </div>
  );
}

export default PaymentTracker;
