import React, { useState, useEffect } from 'react';
import './StudentRecords.css';

function StudentRecords({ fetchStudents, students }) {
  const [sortedStudents, setSortedStudents] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Initialize sortedStudents with students prop when students change
    setSortedStudents(students);
  }, [students]);

  const sortTable = () => {
    const sorted = [...sortedStudents]; // Create a copy to sort without mutating state

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
    const sorted = [...sortedStudents]; // Create a copy to sort without mutating state
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
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map(student => (
            <tr key={student.id}>
              <td className="table-cell">{student.id}</td>
              <td className="table-cell">{student.firstName}</td>
              <td className="table-cell">{student.lastName}</td>
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
