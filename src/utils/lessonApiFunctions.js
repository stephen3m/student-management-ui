function refreshPage() {
  window.location.reload();
}

export async function submitLessonData(lessonData) {
  const url = 'http://localhost:8080/lessons';
  const headers = {
    'Content-Type': 'application/json'
  };

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(lessonData)
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


export async function clearLessonData() {
  const url = 'http://localhost:8080/lessons';
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
    console.error('Error clearing lesson data:', error);
    throw error;
  }
}


export async function fetchLessons() {
  const url = 'http://localhost:8080/lessons';

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error fetching lessons');
  }
}

export async function updateDateAndTime(lessonID, newDateAndTime) {
  const url = `http://localhost:8080/lessons/changeDateAndTime/${lessonID}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const requestBody = {
    dateAndTime: newDateAndTime,
    duration: 0
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
    console.error('Error updating date and time:', error);
    throw error;
  }
}

export async function updateDuration(lessonID, newDuration) {
  const url = `http://localhost:8080/lessons/changeDuration/${lessonID}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  const requestBody = {
    dateAndTime: "2023-08-04T14:30:00",
    duration: newDuration
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
    console.error('Error updating lesson duration:', error);
    throw error;
  }
}

export async function deleteLesson(lessonID) {
  const url = `http://localhost:8080/lessons/delete/${lessonID}`;
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
    return data; // Return the response from the server
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error deleting lesson');
  }
}