function refreshPage() {
  window.location.reload();
}

export async function submitStudentData(studentData) {
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
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error submitting data:', error);
    throw error;
  }
}

export async function clearStudentData() {
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
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error clearing student data:', error);
    throw error;
  }
}

export async function fetchStudents() {
  const url = 'http://localhost:8080/students';

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error fetching students');
  }
}

export async function fetchStudentName(studentID) {
  const url = `http://localhost:8080/students/getName/${studentID}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function updateStudentFirstName(studentId, newFirstName) {
  const url = `http://localhost:8080/students/changeFirstName/${studentId}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const requestBody = {
    firstName: newFirstName,
    lastName: '',
    age: 0,
    phoneNumber: 1234567890,
    instrument: ''
  };

  const options = {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.text();
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error updating first name:', error);
    throw error;
  }
}

export async function updateStudentLastName(studentId, newLastName) {
  const url = `http://localhost:8080/students/changeLastName/${studentId}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const requestBody = {
    firstName: '',
    lastName: newLastName,
    age: 0,
    phoneNumber: 1234567890,
    instrument: ''
  };

  const options = {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.text();
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error updating last name:', error);
    throw error;
  }
}

export async function updateStudentAge(studentId, newAge) {
  const url = `http://localhost:8080/students/changeAge/${studentId}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const requestBody = {
    firstName: '',
    lastName: '',
    age: newAge,
    phoneNumber: 1234567890,
    instrument: ''
  };

  const options = {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.text();
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error updating age:', error);
    throw error;
  }
}

export async function updateStudentPhoneNumber(studentId, newPhoneNumber) {
  const url = `http://localhost:8080/students/changePhoneNumber/${studentId}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const requestBody = {
    firstName: '',
    lastName: '',
    age: 0,
    phoneNumber: newPhoneNumber,
    instrument: ''
  };

  const options = {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.text();
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error updating phone number:', error);
    throw error;
  }
}

export async function updateStudentInstrument(studentId, newInstrument) {
  const url = `http://localhost:8080/students/changeInstrument/${studentId}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const requestBody = {
    firstName: '',
    lastName: '',
    age: 0,
    phoneNumber: 1234567890,
    instrument: newInstrument
  };

  const options = {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(requestBody)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.text();
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error updating instrument:', error);
    throw error;
  }
}

export async function deleteStudent(studentId) {
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
    refreshPage();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error deleting student');
  }
}