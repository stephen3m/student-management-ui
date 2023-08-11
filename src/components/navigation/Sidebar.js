import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Menu icon
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul>
        {isOpen && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lesson-scheduling">Lesson Scheduling</Link>
            </li>
            {/* TODO: Add more navigation links */}
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
