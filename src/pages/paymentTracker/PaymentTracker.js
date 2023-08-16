import React, { useState, useEffect } from 'react';
import PaymentSubmission from '../../components/payment/PaymentSubmission'
import PaymentRecords from '../../components/payment/PaymentRecords'
import PaymentDeletion from '../../components/payment/PaymentDeletion'
import StudentRecordsButton from '../../components/lesson/StudentRecordsButton'

import './PaymentTracker.css';

function PaymentTracker() {
  return (
    <div className="payment-tracker">
      <StudentRecordsButton />
      <PaymentSubmission />
      <PaymentRecords />
      <PaymentDeletion />
    </div>
  );
}

export default PaymentTracker;
