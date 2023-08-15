import React, { useEffect, useState } from 'react';
import './LessonScheduling.css';
import StudentRecordsButton from '../../components/lesson/StudentRecordsButton';
import LessonSubmission from '../../components/lesson/LessonSubmission';
import LessonRecords from '../../components/lesson/LessonRecords';

function LessonScheduling() {
  return (
    <div className="lesson-scheduling">
      <StudentRecordsButton />
      <LessonSubmission />
      <LessonRecords />
    </div>
  );
}

export default LessonScheduling;
