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
      <PaymentDeletion />
      <PaymentRecords />
    </div>
  );
}

export default PaymentTracker;
