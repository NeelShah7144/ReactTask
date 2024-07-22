import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setData } from '../store/actions/loginactions';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

const Login: React.FC = () => {
  const [email, setEmailInput] = useState('');
  const [password, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch: ThunkDispatch<any, unknown, any> = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include one uppercase letter and one special character');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const device_id = 'SsIQnUjSHNuvf0Kg771B7ZGJQHLwyUBJmn3cpqmH';
      const device_token = 'ejL9fezn7YkrNk68Cf966i:APA91bGqrhctItEiG8yBWUdAuEYbyUcB9C9eliVDY-AVUTyW7Mwyz26Xbp5OEXzx7POAX0w-7gtER3A3IrrnyI_1cZoNOTdfgrvFgA5QLFLzcxA1Tq5cv08WOBauNnNyp4b_6A_njNvj';
      const device_type = 'web';

      setLoading(true);
      setError('');

      try {
        const response = await axios.post(
          'https://eaf-dms-api.yecor.com/api/auth/login',
          {
            email,
            password,
            device_id,
            device_token,
            device_type
          }
        );
        console.log("Response from API:", response);

        // Dispatch actions to store email and password in Redux store
        dispatch(setData(response.data));

        // Navigate to the display page
        navigate('/display', { state: { email, password } });

        setLoading(false);

      } catch (error: any) {
        setLoading(false);
        console.log("catch err === ", error);
        const message = "Email or password are incorrect!";
        if (error?.response?.status === 400) {
          setError(message);
        } else {
          setError('Something went wrong. Please try again later.');
        }
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" value={email} onChange={handleEmailChange} />
        {emailError && <p className="error-message">{emailError}</p>}
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      <button type="submit" disabled={loading} className="submit-button">Login</button>
      {error && <p className="error-message">Error: {error}</p>}
    </form>
  );
};

export default Login;
