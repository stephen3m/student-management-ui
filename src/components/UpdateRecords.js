import React, { useState } from 'react';
import './UpdateRecords.css';

function UpdateRecords({ onUpdateFirstName, onUpdateLastName }) {
  const [studentId, setStudentId] = useState('');
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [showFnDiv, setShowFnDiv] = useState(false);
  const [showLnDiv, setShowLnDiv] = useState(false);

  const revealFnDiv = () => {
    setShowFnDiv(true);
    setShowLnDiv(false);
  };

  const revealLnDiv = () => {
    setShowLnDiv(true);
    setShowFnDiv(false);
  };

  const handleUpdateFirstName = async () => {
    try {
      await onUpdateFirstName(studentId, updatedFirstName);
      // Reset the form inputs here
    } catch (error) {
      console.error('Error updating first name:', error);
      alert('Error updating first name.'); // Show an alert message
    }
  };

  const handleUpdateLastName = async () => {
    try {
      await onUpdateLastName(studentId, updatedLastName);
      // Reset the form inputs here
    } catch (error) {
      console.error('Error updating last name:', error);
      alert('Error updating last name.'); // Show an alert message
    }
  };

  return (
    <div className="container">
      <h1>Change Student Records</h1>
      <h3>Enter the ID of the student and click the button corresponding to what information you would like to change. Enter that information and finally, hit the submit button: </h3>
      <label htmlFor="studentId1">Student ID:</label>
      <input type="number" id="studentId1" name="studentId1" required /><br /><br />

      <button type="button" id="changeFnButton" onClick={revealFnDiv}>Change first name</button><br /><br />
      <button type="button" id="changeLnButton" onClick={revealLnDiv}>Change last name</button><br /><br />

      {showFnDiv && (
        <div id="fnDiv">
          <h3>Enter Updated Information</h3>
          <label htmlFor="updateStudentFn">New first name:</label>
          <input
            type="text"
            id="updateStudentFn"
            name="updateStudentFn"
            value={updatedFirstName}
            onChange={(e) => setUpdatedFirstName(e.target.value)}
            required
          /><br /><br />
          <button type="button" id="submitFnButton" onClick={handleUpdateFirstName}>Submit</button>
        </div>
      )}

      {showLnDiv && (
        <div id="lnDiv">
          <h3>Enter Updated Information</h3>
          <label htmlFor="updateStudentLn">New last name:</label>
          <input
            type="text"
            id="updateStudentLn"
            name="updateStudentLn"
            value={updatedLastName}
            onChange={(e) => setUpdatedLastName(e.target.value)}
            required
          /><br /><br />
          <button type="button" id="submitLnButton" onClick={handleUpdateLastName}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default UpdateRecords;
