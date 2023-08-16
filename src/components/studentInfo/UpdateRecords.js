import React, { useState } from 'react';
import './UpdateRecords.css';

function UpdateRecords({ onUpdateFirstName, onUpdateLastName, onUpdateAge, onUpdatePhoneNumber, onUpdateInstrument, onDeleteStudent, onClearData }) {
  const [studentId, setStudentId] = useState('');
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedAge, setUpdatedAge] = useState(0);
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
  const [updatedInstrument, setUpdatedInstrument] = useState('');
  const [showFnDiv, setShowFnDiv] = useState(false);
  const [showLnDiv, setShowLnDiv] = useState(false);
  const [showAgeDiv, setShowAgeDiv] = useState(false);
  const [showPhoneNumberDiv, setShowPhoneNumberDiv] = useState(false);
  const [showInstrumentDiv, setShowInstrumentDiv] = useState(false);

  const revealFnDiv = () => {
    setShowFnDiv(true);
    setShowLnDiv(false);
    setShowAgeDiv(false);
    setShowPhoneNumberDiv(false);
    setShowInstrumentDiv(false);
  };

  const revealLnDiv = () => {
    setShowLnDiv(true);
    setShowFnDiv(false);
    setShowAgeDiv(false);
    setShowPhoneNumberDiv(false);
    setShowInstrumentDiv(false);
  };

  const revealAgeDiv = () => {
    setShowAgeDiv(true);
    setShowFnDiv(false);
    setShowLnDiv(false);
    setShowPhoneNumberDiv(false);
    setShowInstrumentDiv(false);
  };

  const revealPhoneNumberDiv = () => {
    setShowPhoneNumberDiv(true);
    setShowFnDiv(false);
    setShowLnDiv(false);
    setShowAgeDiv(false);
    setShowInstrumentDiv(false);
  };

  const revealInstrumentDiv = () => {
    setShowInstrumentDiv(true);
    setShowFnDiv(false);
    setShowLnDiv(false);
    setShowAgeDiv(false);
    setShowPhoneNumberDiv(false);
  };

  const handleUpdateFirstName = async () => {
    try {
      await onUpdateFirstName(studentId, updatedFirstName);
      setStudentId('');
      setUpdatedFirstName('');
    } catch (error) {
      console.error('Error updating first name:', error);
      alert('Error updating first name.');
    }
  };

  const handleUpdateLastName = async () => {
    try {
      await onUpdateLastName(studentId, updatedLastName);
      setStudentId('');
      setUpdatedLastName('');
    } catch (error) {
      console.error('Error updating last name:', error);
      alert('Error updating last name.');
    }
  };

  const handleUpdateAge = async () => {
    try {
      await onUpdateAge(studentId, updatedAge);
      setStudentId('');
      setUpdatedAge(0);
    } catch (error) {
      console.error('Error updating age:', error);
      alert('Error updating age.');
    }
  };

  const handleUpdatePhoneNumber = async () => {
    try {
      const formattedPhoneNumber = updatedPhoneNumber.replace(/-/g, '');
      await onUpdatePhoneNumber(studentId, formattedPhoneNumber);
      setStudentId('');
      setUpdatedPhoneNumber('');
    } catch (error) {
      console.error('Error updating phone number:', error);
      alert('Error updating phone number.');
    }
  };

  const handleUpdateInstrument = async () => {
    try {
      await onUpdateInstrument(studentId, updatedInstrument);
      setStudentId('');
      setUpdatedInstrument('');
    } catch (error) {
      console.error('Error updating instrument:', error);
      alert('Error updating instrument.');
    }
  };

  const handleDeleteStudent = async () => {
    try {
      await onDeleteStudent(studentId);
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Error deleting student.');
    }
  };

  const handleClearData = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete all student records? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await onClearData();
      } catch (error) {
        console.error('Error:', error);
        alert('Error clearing student data.');
      }
    }
  };

  return (
    <div className="container">
      <h1>Change Student Records</h1>
      <h3>Enter the ID of the student and click the button corresponding to what information you would like to change. Enter that information and finally, hit the submit button: </h3>
      <label htmlFor="studentId">Student ID:</label> <br />
      <input type="number" id="studentId" name="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} required /><br /><br />

      <button type="button" id="changeFnButton" onClick={revealFnDiv}>Change first name</button><br /><br />
      <button type="button" id="changeLnButton" onClick={revealLnDiv}>Change last name</button><br /><br />
      <button type="button" id="changeAgeButton" onClick={revealAgeDiv}>Change age</button><br /><br />
      <button type="button" id="changePhoneNumberButton" onClick={revealPhoneNumberDiv}>Change phone number</button><br /><br />
      <button type="button" id="changeInstrumentButton" onClick={revealInstrumentDiv}>Change instrument</button><br /><br />
      <button type="button" id="deleteStudentButton" onClick={handleDeleteStudent}>Delete Student</button><br /><br />
      <button type="button" id="clearButton" onClick={handleClearData}>
        Delete all students
      </button><br /><br />

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
          <button type="button" className="updateSubmitButton" onClick={handleUpdateFirstName}>Submit</button>
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
          <button type="button" className="updateSubmitButton" onClick={handleUpdateLastName}>Submit</button>
        </div>
      )}

      {showAgeDiv && (
        <div id="ageDiv">
          <h3>Enter Updated Information</h3>
          <label htmlFor="updateStudentAge">New age:</label>
          <input
            type="number"
            id="updateStudentAge"
            name="updateStudentAge"
            value={updatedAge}
            onChange={(e) => setUpdatedAge(e.target.value)}
            required
            min={0}
          /><br /><br />
          <button type="button" className="updateSubmitButton" onClick={handleUpdateAge}>Submit</button>
        </div>
      )}

      {showPhoneNumberDiv && (
        <div id="phoneNumberDiv">
          <h3>Enter Updated Information</h3>
          <label htmlFor="updateStudentPhoneNumber">New phone number:</label>
          <input
            type="text"
            id="updateStudentPhoneNumber"
            name="updateStudentPhoneNumber"
            value={updatedPhoneNumber}
            onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
            required
          /><br /><br />
          <button type="button" className="updateSubmitButton" onClick={handleUpdatePhoneNumber}>Submit</button>
        </div>
      )}

      {showInstrumentDiv && (
        <div id="instrumentDiv">
          <h3>Enter Updated Information</h3>
          <label htmlFor="updateStudentInstrument">New instrument:</label>
          <select
            id="updateStudentInstrument"
            name="updateStudentInstrument"
            value={updatedInstrument}
            onChange={(e) => setUpdatedInstrument(e.target.value)}
            required
          >
            <option value="">Select an instrument</option>
            <option value="Violin">Violin</option>
            <option value="Viola">Viola</option>
            <option value="Piano">Piano</option>
          </select><br /><br />
          <button type="button" className="updateSubmitButton" onClick={handleUpdateInstrument}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default UpdateRecords;
