import React, { useState, useEffect } from 'react';
import SecurityCodeInput from '../components/ui/CodeInput';
import '../css/EmailVerificationForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const password = location.state?.password || "";

  const handleCodeChange = (code) => {
    setVerificationCode(code);
    setError('');
    
    if (code.length === 4) {
      verifyCode(code);
    }
  };

  const verifyCode = async (code) => {
    setIsLoading(true);
    try {
      // Verify email with backend
      const verifyResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/verify-email`,
        { email, code }
      );
      
      if (verifyResponse.data.success) {
        // Automatically login after successful verification
        const loginResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/login`,
          { email, password }
        );
        
        if (loginResponse.data.success) {
          localStorage.setItem("token", loginResponse.data.data);
          navigate("/registration-details");
        }
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setError(
        error.response?.data?.message || 
        "Invalid verification code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificationCode.length === 4) {
      verifyCode(verificationCode);
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register/resend-code`, { email });
      alert("New verification code sent successfully!");
    } catch (error) {
      console.error("Resend failed:", error);
      alert("Failed to resend code. Please try again later.");
    }
  };

  return (
    <div className="email-verification-form">
      <h1>Email bestätigen</h1>
      
      <p className="instruction-text">
        Bitte geben Sie den 4-stelligen Sicherheitscode ein, den wir an {email} gesendet haben.
      </p>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="securityCode">SICHERHEITSCODE</label>
          <SecurityCodeInput 
            length={4} 
            onChange={handleCodeChange} 
            value={verificationCode}
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          className="verify-button"
          disabled={verificationCode.length !== 4 || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Bestätigen'}
        </button>
      </form>
      
      <div className="resend-container">
        <p>Keinen Code erhalten?</p>
        <button 
          type="button" 
          className="resend-button"
          onClick={handleResendCode}
          disabled={isLoading}
        >
          Code erneut senden
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationForm;