import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faCalendarWeek, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'opened' : 'closed'}`}>
      {/* Closed View */}
      {!isExpanded && (
        <div className="closed-view">
          <button className="btn toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} className="icon-menu"/>
          </button>
          <ul className="list-unstyled small-icons">
            <li>
              <Link to="/" className="icon-nav-link">
                <FontAwesomeIcon icon={faHome} className="icon-home" />
              </Link>
            </li>
            <li>
              <Link to="/lesson-scheduling" className="icon-nav-link">
                <FontAwesomeIcon icon={faCalendarWeek} className="icon-calendar" />
              </Link>
            </li>
            <li>
              <Link to="/payment-tracker" className="icon-nav-link">
                <FontAwesomeIcon icon={faMoneyCheckDollar} className="icon-dollar" />
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Expanded View */}
      {isExpanded && (
        <div className="expanded-view">
          <button className="btn toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} className="icon-menu"/>
          </button>
          <ul className="list-unstyled">
            <li>
              <Link to="/" className="nav-link"><span id="home-span">Home</span></Link>
            </li>
            <li>
              <Link to="/lesson-scheduling" className="nav-link"><span id="ls-span">Lesson Scheduling</span></Link>
            </li>
            <li>
              <Link to="/payment-tracker" className="nav-link"><span id="pt-span">Payment Tracker</span></Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
