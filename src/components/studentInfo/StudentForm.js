import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faGripLines, faFile, faSignal, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
//<FontAwesomeIcon icon={faGripLines} className="icon-grip" />
//<FontAwesomeIcon icon={faSquare} className="icon-square" />
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
    <div id="form-container" className="container">
      {/* Student Form Heading */}
      <h1 style={{ fontFamily: 'Futura' }} className="text-center mb-4">
        Student Form
      </h1>
      <hr />

      {/* Form */}
      <form id="studentForm" className="border p-3">
        <h4 className="text-center mt-2">Enter the student information below and click submit</h4>
        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            required
            min={1}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number (Format: 123-456-7890 or 1234567890):</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Instrument */}
        <div className="mb-3">
          <label htmlFor="instrument" className="form-label">Instrument:</label>
          <select
            id="instrument"
            name="instrument"
            className="form-select"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
          >
            <option value="">Select Instrument</option>
            <option value="Violin">Violin</option>
            <option value="Viola">Viola</option>
            <option value="Piano">Piano</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="button" id="submitButton" onClick={handleSubmit}>
            <span id="submit-text">SUBMIT</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
