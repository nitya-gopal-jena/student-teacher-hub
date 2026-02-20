import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import '../../css/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', age: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/students/signup', formData);
      toast.success(response?.data?.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data.message || 'Registration Failed!');
    }
  };

  return (
    <>
      <div className='signup-container'>
        <div className='signup-box'>
          <form onSubmit={handleSubmit}>
            <h3 className='form-title'>Create an account</h3>

            <div className='form-groups'>
              <input type='text' placeholder='Enter your name' id='name' name='name' value={formData.name} onChange={handleChange} required />
            </div>

            <div className='form-groups'>
              <input type='email' placeholder='Enter your email' id='email' name='email' value={formData.email} onChange={handleChange} required />
            </div>

            <div className='form-groups'>
              <input type='password' placeholder='Enter password' id='password' name='password' value={formData.password} onChange={handleChange} required />
            </div>

            <div className='form-groups'>
              <input type='number' placeholder='Enter your age' id='age' name='age' value={formData.age} onChange={handleChange} required />
            </div>

            <div className='submit-btn'>
              <button type='submit'>Signup</button>
            </div>

            <p className='login-link'>
              Have an account ? <Link to='/login'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
