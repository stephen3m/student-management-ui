import React, { useEffect, useState } from 'react';
import StudentForm from '../../components/studentInfo/StudentForm';
import StudentRecords from '../../components/studentInfo/StudentRecords';
import UpdateRecords from '../../components/studentInfo/UpdateRecords';
import './Home.css';
import {
  submitStudentData,
  clearStudentData,
  fetchStudents,
  updateStudentFirstName,
  updateStudentLastName,
  updateStudentAge,
  updateStudentPhoneNumber,
  updateStudentInstrument,
  deleteStudent
} from '../../utils/homeApiFunctions';

function Home() {
  const [students, setStudents] = useState([]);

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
    <div className="container">
      <StudentForm onSubmit={submitStudentData} />
      <StudentRecords fetchData={fetchStudents} students={students} />
      <UpdateRecords
        onUpdateFirstName={updateStudentFirstName}
        onUpdateLastName={updateStudentLastName}
        onUpdateAge={updateStudentAge}
        onUpdatePhoneNumber={updateStudentPhoneNumber}
        onUpdateInstrument={updateStudentInstrument}
        onDeleteStudent={deleteStudent}
        onClearData={clearStudentData}
      />
    </div>
  );
}

export default Home;
