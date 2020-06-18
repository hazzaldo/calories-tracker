import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link to='/' className='navbar-brand'>Calories Tracker</Link>
      <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        <div className='navbar-nav'>
          <Link to='/' className='nav-item nav-link'>All Meal Logs</Link>
          <Link to='/user' className='nav-item nav-link'>Create User</Link>
          <Link to='/meal' className='nav-item nav-link'>Create Meal Log</Link>
          <Link to='/edit/:id' className='nav-item nav-link'>Edit Meal Log</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
