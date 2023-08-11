import React, { useEffect, useState } from 'react';
import StudentForm from '../../components/studentInfo/StudentForm';
import StudentRecords from '../../components/studentInfo/StudentRecords';
import UpdateRecords from '../../components/studentInfo/UpdateRecords';
import {
  submitStudentData,
  clearStudentData,
  fetchStudents,
  updateStudentFirstName,
  updateStudentLastName,
  deleteStudent
} from '../../utils/apiFunctions';

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
      <StudentForm onSubmit={submitStudentData} onClearData={clearStudentData} />
      <StudentRecords fetchData={fetchStudents} students={students} />
      <UpdateRecords
        onUpdateFirstName={updateStudentFirstName}
        onUpdateLastName={updateStudentLastName}
        onDeleteStudent={deleteStudent}
      />
    </div>
  );
}

export default Home;
