import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/conversation">Conversation</NavLink>
      <NavLink to="/diary">Diary</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;