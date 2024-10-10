// src/components/auth/AuthForm.tsx

import React, { useState } from 'react';
import { registerUser, loginUser } from '../../services/api';
// import './AuthForm.css'; // Import CSS for styles
import { AxiosError } from 'axios';

interface AuthFormProps {
  onLoginSuccess: (token: string) => void;
}
interface ErrorResponse {
  message: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(username, password);
      alert('User registered successfully!');
      setIsLogin(true);
    } catch(err) { 
      setErrorMessage('Registration failed.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await loginUser(username, password);
        onLoginSuccess(response.data.token);
        alert('Login successful!');
    } catch (err) {
        // Use AxiosError type for better type inference
        const error = err as AxiosError;

        // Check if response and data exist
        const errorMessage: string =
            (error.response?.data as ErrorResponse)?.message || 'An unexpected error occurred.';

        setErrorMessage(errorMessage);
    }
};

  const toggleForm = () => {
    setErrorMessage(null); // Clear error message on toggle
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>
        {isLogin ? 'Need an account? ' : 'Already have an account? '}
        <button onClick={toggleForm}>{isLogin ? 'Register' : 'Login'}</button>
      </p>
    </div>
  );
};

export default AuthForm;
