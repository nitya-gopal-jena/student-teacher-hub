import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css'

const Navbar = () => {
 
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <>
      <div className='navbar'>
        <div className='nav-logo'>
          <h3>Student~Teacher-Hub</h3>
        </div>

        <div className='item-groups'>
          <Link to='/'>Home</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to='/contact'>Contact</Link>
        </div>

        <div className="login-btn">
          <button type='submit' className='login'  onClick={handleLogin} >Login</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
