//import './LessonRecords.css';
//
//function LessonRecords({ fetchLessons, lessons }) {
//  useEffect(() => {
//    // Initialize sortedStudents with students prop when students change
//    setSortedStudents(students);
//  }, [students]);
//
//  const localizer = momentLocalizer(moment);
//
//  const EventComponent = ({ event }) => {
//    const handleDelete = async () => {
//      const confirmed = window.confirm('Are you sure you want to delete this lesson?');
//      if (confirmed) {
//        try {
//          await deleteScheduleEntry(event.studentID);
//          setEvents(events.filter((e) => e.studentID !== event.studentID));
//        } catch (error) {
//          console.error('Error deleting event:', error);
//        }
//      }
//    };
//
//    return (
//      <div className="rbc-event">
//        <span>{event.title}</span>
//        <button className="delete-button" onClick={handleDelete}>Delete</button>
//      </div>
//    );
//  };
//
//  return (
//    <div className="calendar-container">
//      <h2>Schedule</h2>
//      <Calendar
//        localizer={localizer}
//        events={events}
//        startAccessor="start"
//        endAccessor="end"
//        components={{
//          event: EventComponent,
//        }}
//      />
//    </div>
//  );
//}
//
//export default LessonRecords;
