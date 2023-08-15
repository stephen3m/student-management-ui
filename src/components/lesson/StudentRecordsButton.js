import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import StudentRecords from '../../components/studentInfo/StudentRecords';
import { fetchLessons } from '../../utils/lessonApiFunctions';
import { fetchStudents } from '../../utils/homeApiFunctions';

import './StudentRecordsButton.css';

function StudentRecordsButton() {
  const [students, setStudents] = useState([]);
  const [showStudentRecords, setShowStudentRecords] = useState(false);

  const toggleStudentRecords = () => {
    setShowStudentRecords((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <button id="student-record-button" onClick={toggleStudentRecords}>
        {showStudentRecords ? 'Hide Student Records' : 'Show Student Records'}
      </button> <br /><br />

      {showStudentRecords && (
        <div>
          <StudentRecords fetchData={fetchLessons} students={students} />
        </div>
      )}
      <br />
    </>
  );
}

export default StudentRecordsButton;
