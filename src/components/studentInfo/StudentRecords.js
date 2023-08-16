import React, { useState, useEffect } from 'react';
import './StudentRecords.css';

function StudentRecords({ fetchStudents, students }) {
  const [sortedStudents, setSortedStudents] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setSortedStudents(students);
  }, [students]);

  const sortTable = () => {
    const sorted = [...sortedStudents];

    sorted.sort((a, b) => {
      const nameA = a.lastName.toLowerCase();
      const nameB = b.lastName.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    setSortedStudents(sorted);
  };

  const sortIds = () => {
    const sorted = [...sortedStudents];
    sorted.sort((a, b) => a.id - b.id);

    setSortedStudents(sorted);
  };

  return (
    <div className="container">
      <h1>Student Records</h1>
      <table id="studentTable">
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
              <td className="table-cell">{student.id}</td>
              <td className="table-cell">{student.firstName}</td>
              <td className="table-cell">{student.lastName}</td>
              <td className="table-cell">{student.age}</td>
              <td className="table-cell">
                {student.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
              </td>
              <td className="table-cell">{student.instrument}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button type="button" id="refreshButton" onClick={fetchStudents}>
        Refresh Student Data
      </button>
      <br /><br />
      <button type="button" id="sortButton" onClick={sortTable}>
        Sort by alphabetical order (last name)
      </button>
      <br /><br />
      <button type="button" id="sortIdButton" onClick={sortIds}>
        Sort by IDs (least to greatest)
      </button>
      <br /><br />
    </div>
  );
}

export default StudentRecords;
