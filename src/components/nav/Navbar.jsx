import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation(); // Get the current location path

  // Check if the current path is "/data-visualization-dashboard"
  const isDashboardPath = location.pathname === '/data-visualization-dashboard';

  return (
    <div className='w-full px-5'>
      <Link to={isDashboardPath ? '/' : '/data-visualization-dashboard'} className='text-accent font-semibold'>
        {isDashboardPath ? <>
          <span className='text-start'>
           ⬅️ Back to Email Client App
          </span>
        </> : <div className='w-full text-end'>
        <span>
        Path to Interactive Data Visualization Dashboard ➡️
        </span>
        </div>}
      </Link>
    </div>
  );
}

export default Navbar;
