import React, { useState } from 'react';
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
    <div className="container">
      <h1 style={{ fontFamily: 'Futura' }} className="text-center">Schedule a Lesson</h1>
      <div id="lesson-scheduling-form-div" className="border p-3 mt-4">
        <label htmlFor="studentId" className="label">Input the ID of the student you want to schedule a lesson for:</label>
        <input
          type="number"
          id="studentId"
          name="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          min="0"
          required
          className="form-control mb-3"
          placeholder="Student ID"
        />
        <hr />

        <div className="mb-3">
          <label className="label">Select a Date and Time:</label>
          <DatePicker
            className="form-control"
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={timeInterval}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select a date and time"
            popperPlacement="right-start"
          />
        </div>
        <div className="mb-3">
          <label className="small-label">Choose time interval for time selection:</label>
          <select id="time-interval-select" className="form-select" value={timeInterval} onChange={(e) => handleTimeIntervalChange(parseInt(e.target.value))}>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
        </div>
        <hr />

        <div className="mb-3">
          <label className="label">Lesson Duration (0-120 minutes):</label>
          <input
            id="lesson-duration-input"
            className="form-control"
            type="number"
            min="0"
            max="120"
            value={customInterval}
            onChange={handleCustomIntervalChange}
          />
        </div>
        <button id="submit-button" onClick={handleSubmitLesson} className="btn btn-primary">Submit Lesson</button>
      </div>
    </div>
  );
}

export default LessonSubmission;
