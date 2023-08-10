import React, { useState } from 'react';
import './StudentForm.css';

function StudentForm({ onSubmit, onClearData }) {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async () => {
    const studentData = {
      id: parseInt(studentId),
      firstName: firstName,
      lastName: lastName
    };

    try {
      await onSubmit(studentData);
      // Reset the form inputs
      setStudentId('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClearData = async () => {
    try {
      await onClearData();
    } catch (error) {
      console.error('Error:', error);
      alert('Error clearing student data.'); // Show an alert message
    }
  };

  return (
    <div className="container">
      <h1>Student Form</h1>
      <form id="studentForm">
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="number"
          id="studentId"
          name="studentId"
          required
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        /><br /><br />

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        /><br /><br />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        /><br /><br />

        <button type="button" id="submitButton" onClick={handleSubmit}>
          Submit
        </button>
      </form>

      <button type="button" id="clearButton" onClick={handleClearData}>
        Clear all entries
      </button><br /><br />
    </div>
  );
}

export default StudentForm;
