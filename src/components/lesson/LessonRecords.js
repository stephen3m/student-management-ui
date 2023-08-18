import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { fetchStudentName } from '../../utils/homeApiFunctions';
import {
  fetchLessons,
  fetchLessonDuration,
  fetchLessonDateAndTime
} from '../../utils/lessonApiFunctions';
import { fetchScheduleEntries, deleteScheduleEntry } from '../../utils/scheduleApiFunctions';

import './LessonRecords.css';

function LessonRecords() {
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
  const [events, setEvents] = useState([]);
  const [activeView, setActiveView] = useState('day');

  const handleViewChange = (view) => {
    setActiveView(view);
  };

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
        {activeView === 'week' ? (
          <span>{event.title}</span>
        ) : (
          <>
            <span>{event.title}</span>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <h1 style={{ fontFamily: 'Futura' }} className="text-center">Lesson Calendar</h1>
      <hr />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          event: EventComponent,
        }}
        step={30}
        onView={handleViewChange} // Handle view change
      />
    </div>
  );
}

export default LessonRecords;
