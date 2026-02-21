import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css/verifyotp.css';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputsRef.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    try {
      const otpString = otp.join('');
      console.log('Sending OTP:', otpString, typeof otpString);
      const res = await axios.post('http://localhost:4000/api/students/login/verify-otp', { email: email, otp: otpString });

      localStorage.setItem('jwt', res.data.token);
      toast.success('OTP Verified Successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      toast.error('Invalid or expired OTP');
    }
  };
  return (
    <>
      <div className='otp-container'>
        <div className='otp-box'>
          <h2 className='otp-title'>Enter OTP</h2>
          <div className='otp-inputs'>
            {otp.map((digit, i) => (
              <input
                key={i}
                type='text'
                maxLength='1'
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                ref={(el) => (inputsRef.current[i] = el)}
                className='otp-input'
              />
            ))}
          </div>
          <button className='otp-button' onClick={handleVerify}>
            Verify
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
