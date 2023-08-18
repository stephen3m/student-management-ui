import React, { useState, useEffect } from 'react';
import './StudentRecords.css';

function StudentRecords({ fetchStudents, students }) {
  const [sortedStudents, setSortedStudents] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedSortOption, setSelectedSortOption] = useState('');

  useEffect(() => {
    setSortedStudents(students);
  }, [students]);

  useEffect(() => {
    if (selectedSortOption) {
      sortTable();
    }
  }, [selectedSortOption]);

  const sortTable = () => {
    const sorted = [...sortedStudents];

    sorted.sort((a, b) => {
      if (selectedSortOption === 'lastName') {
        const nameA = a.lastName.toLowerCase();
        const nameB = b.lastName.toLowerCase();
        return nameA.localeCompare(nameB);
      } else if (selectedSortOption === 'id') {
        return a.id - b.id;
      }
    });

    setSortedStudents(sorted);
  };

  return (
    <div className="container">
      <h1 style={{ fontFamily: 'Futura' }} className="text-center">Student Records</h1>

      {/* Dropdown Menu */}
      <div className="mb-3">
        <label htmlFor="sortDropdown" className="form-label">Sort by:</label>
        <select
          id="sortDropdown"
          className="form-select"
          value={selectedSortOption}
          onChange={(e) => setSelectedSortOption(e.target.value)}
        >
          <option value="" disabled>Select an option</option>
          <option value="lastName">Last Name</option>
          <option value="id">ID</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Instrument</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.age}</td>
              <td>
                {student.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
              </td>
              <td>{student.instrument}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentRecords;
