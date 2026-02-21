import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../css/login.css';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/students/login', formData);
      toast.success(response?.data?.message);
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login Failed!');
    }
  };

  return (
    <>
      <div className='login-container'>
        <div className='login-box'>
          <form onSubmit={handleSubmit}>
            <h3 className='form-title'>Welcome back</h3>

            <div className='form-groups'>
              <input type='email' placeholder='Enter your email' id='email' name='email' value={formData.email} onChange={handleChange} required />
            </div>

            <div className='form-groups'>
              <input type='password' placeholder='Enter password' id='password' name='password' value={formData.password} onChange={handleChange} required />
            </div>

            <div className='submit-btn'>
              <button type='submit'>Login</button>
            </div>

            <p className='signup-link'>
              Don't have an account ? <Link to='/signup'>Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
