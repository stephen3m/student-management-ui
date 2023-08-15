function refreshPage() {
  window.location.reload();
}

export async function submitToSchedule(data) {
  const url = 'http://localhost:8080/schedule';
  const headers = {
    'Content-Type': 'application/json'
  };

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
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

export async function fetchScheduleEntries() {
  const url = 'http://localhost:8080/schedule';

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error fetching schedule data');
  }
}

export async function deleteScheduleEntry(studentId) {
  const url = `http://localhost:8080/schedule/deleteGivenStudentId/${studentId}`;
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
    throw new Error('Error deleting schedule entry');
  }
}