import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from './components/navigation/Sidebar';
import Home from './pages/home/Home';
import LessonScheduling from './pages/lessonScheduling/LessonScheduling';
import PaymentTracker from './pages/paymentTracker/PaymentTracker';

function App() {
  return (
    <Router>
      <div className="App">
      <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={(<Home />)} />
            <Route path="/lesson-scheduling" element={<LessonScheduling />} />
            <Route path="/payment-tracker" element={<PaymentTracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;