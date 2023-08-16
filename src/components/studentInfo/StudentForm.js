import React, { useState } from 'react';
import './StudentForm.css';

function StudentForm({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [instrument, setInstrument] = useState('');

  const handleSubmit = async () => {
    const studentData = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      phoneNumber: phoneNumber.replace(/-/g, ''),
      instrument: instrument
    };

    try {
      await onSubmit(studentData);
      setFirstName('');
      setLastName('');
      setAge(1);
      setPhoneNumber('');
      setInstrument('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Student Form</h1>
      <form id="studentForm">
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

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          required
          min={1}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        /><br /><br />

        <label htmlFor="phoneNumber">Phone Number (Format: 123-456-7890 or 1234567890):</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        /><br /><br />

        <label htmlFor="instrument">Instrument:</label>
        <select
          id="instrument"
          name="instrument"
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
        >
          <option value="">Select Instrument</option>
          <option value="Violin">Violin</option>
          <option value="Viola">Viola</option>
          <option value="Piano">Piano</option>
        </select><br /><br />

        <button type="button" id="submitButton" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
