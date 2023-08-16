import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  submitLessonData,
  fetchLessons,
} from '../../utils/lessonApiFunctions';
import { submitToSchedule, fetchScheduleEntries, deleteScheduleEntry } from '../../utils/scheduleApiFunctions';
import { fetchStudents, fetchStudentName } from '../../utils/homeApiFunctions';

import './LessonSubmission.css';

function LessonSubmission() {
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
    }
  };

  const handleSubmitLesson = async () => {
    const lessonData = {
      dateAndTime: selectedDate,
      duration: customInterval
    };

    try {
      const response = await submitLessonData(lessonData);
      console.log('Lesson submitted:', response);

      if (response.lessonID) {
        const scheduleData = {
          studentID: studentId,
          lessonID: response.lessonID
        };

        const scheduleResponse = await submitToSchedule(scheduleData);
        console.log('Added to schedule:', scheduleResponse);
      }
    } catch (error) {
      console.error('Error submitting lesson:', error);
    }
  };

  return (
    <>
      <h1>Schedule a Lesson</h1> <br />

      <label htmlFor="studentId">Insert the student ID of the student you want to schedule a lesson for:</label><br />
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
        <label className="label">Select a Date and Time:</label><br />
        <DatePicker
          className="date-picker"
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="hh:mm aa"
          timeIntervals={timeInterval}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select a date and time"
        /> <hr />

        <label className="small-label">Change time interval when selecting date and time:</label>
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
        <label className="label">Lesson Duration (0-120 minutes):</label><br />
        <input
          className="lesson-duration-input"
          type="number"
          min="0"
          max="120"
          value={customInterval}
          onChange={handleCustomIntervalChange}
        />
      </div>

      <button id="submit-button" onClick={handleSubmitLesson}>Submit Lesson</button>
    </>
  );
}

export default LessonSubmission;
