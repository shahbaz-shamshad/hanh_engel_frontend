import React, { useState } from 'react';
import '../css/ForgotPasswordForm.css';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
  
    try {
      console.log('Here: ${import.meta.env.VITE_API_URL}');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/forgot-password`, {
        email: email,
      });
  
      console.log("Response:", response.data);
      alert(response.data.data || "Link zum Zurücksetzen wurde gesendet!");
    } catch (error) {
      console.error("Error:", error);
      alert(
        error?.response?.data?.message ||
        "Etwas ist schief gelaufen beim Zurücksetzen des Passworts."
      );
    }
  };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle password reset logic here
  //   console.log({ email });
  // };

  return (
    <div className="forgot-password-form">
      <h1>Passwort vergessen</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Email eingeben" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <button type="submit" className="send-link-button">Link senden</button>
      </form>
      
      <p className="instruction-text">
        Bitte geben Sie Ihre gültige E-Mail-Adresse ein, um den Link zum Zurücksetzen Ihres Passworts zu erhalten
      </p>
      
      <div className="alternative-actions">
        <Button variant="secondary" text="Anmelden" type="button" onClick={() => navigate('/')} />
        <Button variant="tertiary" text="Registrieren" type="button" onClick={() => navigate('/register')} />
      </div>
    </div>
  );
};

export default ForgotPasswordForm;