import React, { useState, useEffect } from 'react';
import { fetchPayments } from '../../utils/paymentApiFunctions';
import './PaymentRecords.css';

function PaymentRecords() {
  const [payments, setPayments] = useState([]);
  const [sortAsc, setSortAsc] = useState(false);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const paymentData = await fetchPayments();
        setPayments(paymentData);
      } catch (error) {
        console.error('Error fetching payment records:', error);
      }
    }

    fetchData();
  }, []);

  const handleSortByDate = () => {
    const sortedPayments = [...payments].sort((a, b) => {
      return sortAsc
        ? new Date(a.paymentDate) - new Date(b.paymentDate)
        : new Date(b.paymentDate) - new Date(a.paymentDate);
    });
    setPayments(sortedPayments);
    setSortAsc(!sortAsc);
  };

  const filteredPayments = payments.filter((payment) =>
    payment.studentName.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="payment-records-container">
      <h2 className="payment-records-header">Payment Records</h2>
      <input
        type="text"
        className="filter-input"
        placeholder="Filter by Student Name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <table className="payment-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Payment Date</th>
            <th>Student Name</th>
            <th>Payment Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td>{payment.studentName}</td>
              <td>
                ${payment.paymentDollarAmount}.
                {payment.paymentCentAmount < 10 ? '0' : ''}
                {payment.paymentCentAmount}
              </td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sort-buttons">
        <button className="sort-date-button" onClick={handleSortByDate}>
          {sortAsc ? 'Sort by date (earliest to latest)' : 'Sort by date (latest to earliest)'}
        </button>
      </div>
    </div>
  );
}

export default PaymentRecords;
