import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './LessonScheduling.css';
import StudentRecords from '../../components/studentInfo/StudentRecords';
import {
  submitLessonData,
  fetchLessons,
  fetchLessonDuration,
  fetchLessonDateAndTime
} from '../../utils/lessonApiFunctions';
import { submitToSchedule, fetchScheduleEntries, deleteScheduleEntry } from '../../utils/scheduleApiFunctions';
import { fetchStudents, fetchStudentName } from '../../utils/homeApiFunctions';

function LessonScheduling() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeInterval, setTimeInterval] = useState(15);
  const [customInterval, setCustomInterval] = useState(0);
  const [events, setEvents] = useState([]);
  const [showStudentRecords, setShowStudentRecords] = useState(false);

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

  useEffect(() => {
      const fetchSchedule = async () => {
        try {
          const scheduleData = await fetchScheduleEntries();

          const formattedEvents = await Promise.all(
            scheduleData.map(async (entry) => {
              const studentName = await fetchStudentName(entry.studentID);
              const lessonDateAndTime = await fetchLessonDateAndTime(entry.lessonID);
              const lessonDuration = await fetchLessonDuration(entry.lessonID);

              return {
                title: studentName,
                studentID: entry.studentID,
                start: moment(lessonDateAndTime).toDate(),
                end: moment(lessonDateAndTime)
                  .add(lessonDuration, 'minutes')
                  .toDate(),
              };
            })
          );

          setEvents(formattedEvents);
        } catch (error) {
          console.error('Error fetching schedule:', error);
        }
      };

      fetchSchedule();
    }, []);

  const localizer = momentLocalizer(moment);

  const EventComponent = ({ event }) => {
    const handleDelete = async () => {
      const confirmed = window.confirm('Are you sure you want to delete this lesson?');
      if (confirmed) {
        try {
          await deleteScheduleEntry(event.studentID);
          setEvents(events.filter((e) => e.studentID !== event.studentID));
        } catch (error) {
          console.error('Error deleting event:', error);
        }
      }
    };

    return (
      <div className="rbc-event">
        <span>{event.title}</span>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
    );
  };

  return (
    <div className="lesson-scheduling">
      {/* Display student records */}
      <button onClick={toggleStudentRecords}>Show Student Records</button> <br /> <br />

      {showStudentRecords && (
        <div>
          <StudentRecords fetchData={fetchLessons} students={students} />
        </div>
      )}

      <h1>Schedule a Lesson</h1> <br />

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

      <button onClick={handleSubmitLesson}>Submit Lesson</button>

      <div className="calendar-container">
        <h2>Schedule</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          components={{
            event: EventComponent,
          }}
        />
      </div>
    </div>
  );
}

export default LessonScheduling;
