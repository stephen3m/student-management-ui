import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './components/navigation/Sidebar';
import Home from './pages/home/Home';
import LessonScheduling from './pages/lessonScheduling/LessonScheduling';

function App() {
  return (
    <Router>
      <div className="App">
      <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={(<Home />)} />
            <Route path="/lesson-scheduling" element={<LessonScheduling />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;