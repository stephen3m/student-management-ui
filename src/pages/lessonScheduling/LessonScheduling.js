import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './LessonScheduling.css';
import StudentRecords from '../../components/studentInfo/StudentRecords';
import {
  submitLessonData,
  clearLessonData,
  fetchLessons,
  updateDateAndTime,
  updateDuration,
  deleteLesson
} from '../../utils/lessonApiFunctions';
import {fetchStudents} from '../../utils/homeApiFunctions';

function LessonScheduling() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeInterval, setTimeInterval] = useState(15);
  const [customInterval, setCustomInterval] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeIntervalChange = (interval) => {
    setTimeInterval(interval);
  };

  const handleCustomIntervalChange = (event) => {
    const inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 120) {
      setCustomInterval(inputValue);
      setTimeInterval(inputValue);
    }
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
    <div className="lesson-scheduling">
      <StudentRecords fetchData={fetchLessons} students={students} />
      <h1>Schedule a Lesson</h1>
      <label htmlFor="studentId">Insert the student ID of the student you want to schedule a lesson for:</label>
      <input
        type="number"
        id="studentId"
        name="studentId"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        min="0"
        required
      /><br />

      <div className="input-group">
        <label className="label">Time Interval:</label>
        <div className="dropdown">
          <button className="dropbtn">{timeInterval} minutes</button>
          <div className="dropdown-content">
            <button onClick={() => handleTimeIntervalChange(10)}>10 minutes</button>
            <button onClick={() => handleTimeIntervalChange(15)}>15 minutes</button>
            <button onClick={() => handleTimeIntervalChange(30)}>30 minutes</button>
          </div>
        </div>
      </div>

      <div className="input-group">
        <label>Select a Date and Time:</label><br />
        <DatePicker
          className="date-picker"
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="hh:mm aa"
          timeIntervals={timeInterval}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select a date and time"
        />
      </div>

      <div className="input-group">
        <label>Lesson Duration (0-120 minutes):</label><br />
        <input
          className="lesson-duration-input"
          type="number"
          min="0"
          max="120"
          value={customInterval}
          onChange={handleCustomIntervalChange}
        />
      </div>
    </div>
  );
}

export default LessonScheduling;
