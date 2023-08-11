import React, { useEffect, useState } from 'react';
import './App.css';
import StudentForm from './components/studentInfo/StudentForm'
import StudentRecords from './components/studentInfo/StudentRecords'
import UpdateRecords from './components/studentInfo/UpdateRecords'
//import {
//  submitStudentData,
//  clearStudentData,
//  fetchData,
//  updateStudentFirstName,
//  updateStudentLastName,
//  deleteStudent
//} from './utils/apiFunctions';

function App() {
  const submitData = async (studentData) => {
    const url = 'http://localhost:8080/students';
    const headers = {
      'Content-Type': 'application/json'
    };

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(studentData)
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log(data); // Log the response from the server
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const clearData = async () => {
    const url = 'http://localhost:8080/students';
    const headers = {
      'Content-Type': 'application/json'
    };

    const options = {
      method: 'DELETE',
      headers: headers
    };

    try {
      const response = await fetch(url, options);
      const data = await response.text();

      console.log(data); // Log the response from the server
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert('Error clearing student data.'); // Show an alert message
    }
  };

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = 'http://localhost:8080/students';

    try {
      const response = await fetch(url);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function refreshPage() {
    window.location.reload();
  }

  async function updateFirstName() {
       const studentId = parseInt(document.getElementById('studentId1').value);
       const newFirstName = document.getElementById('updateStudentFn').value;

       const url = `http://localhost:8080/students/changeFirstName/${studentId}`;
       const headers = {
           'Content-Type': 'application/json'
       };

       const requestBody = {
           firstName: newFirstName,
           lastName: ""
       };

       const options = {
           method: 'PATCH',
           headers: headers,
           body: JSON.stringify(requestBody)
       };

       try {
           const response = await fetch(url, options);
           const data = await response.text();

           console.log(data); // Log the response from the server
           refreshPage(); // Refresh the page to update the table
       } catch (error) {
           console.error('Error:', error);
           alert('Error updating first name.'); // Show an alert message
       }
   }

   async function updateLastName() {
       const studentId = parseInt(document.getElementById('studentId1').value);
       const newLastName = document.getElementById('updateStudentLn').value;

       const url = `http://localhost:8080/students/changeLastName/${studentId}`;
       const headers = {
           'Content-Type': 'application/json'
       };

       const requestBody = {
           firstName: "",
           lastName: newLastName
       };

       const options = {
           method: 'PATCH',
           headers: headers,
           body: JSON.stringify(requestBody)
       };

       try {
           const response = await fetch(url, options);
           const data = await response.text();

           console.log(data); // Log the response from the server
           refreshPage(); // Refresh the page to update the table
       } catch (error) {
           console.error('Error:', error);
           alert('Error updating last name.'); // Show an alert message
       }
   }

  async function deleteStudent() {
      const studentId = parseInt(document.getElementById('studentId1').value);

      const url = `http://localhost:8080/students/delete/${studentId}`;
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.text();
        console.log(data); // Log the response from the server
        fetchData(); // Refresh the student list after deletion
      } catch (error) {
        console.error('Error:', error);
      }
   }

  return (
    <div className="container">
        <StudentForm onSubmit={submitData} onClearData={clearData} />
        <StudentRecords fetchData={fetchData} students={students} />
        <UpdateRecords
            onUpdateFirstName={updateFirstName}
            onUpdateLastName={updateLastName}
            onDeleteStudent={deleteStudent}
        />
      </div>
    );
  }

  export default App;