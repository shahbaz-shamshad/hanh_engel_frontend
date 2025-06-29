import React, { useState } from "react";
import "../css/RegisterForm.css";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveData, setSaveData] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        { email, password }
      );
      
      if (response.data.success) {
        localStorage.setItem("email", email);
        navigate("/verify-email", {
          state: { 
            email: email,
            password: password 
          }
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error.response?.data?.message || 
        "Registration failed. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h1>Registrieren</h1>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            placeholder="Email eingeben"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORT</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Neues Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className="eye-icon"></i>
            </button>
          </div>
        </div>

        <div className="save-data-option">
          <input
            type="checkbox"
            id="saveData"
            checked={saveData}
            onChange={() => setSaveData(!saveData)}
          />
          <label htmlFor="saveData">Anmeldedaten speichern</label>
        </div>

        <div className="button-container">
          <Button
            variant="primary"
            text={isLoading ? "Processing..." : "Registrieren"}
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          />
          <Button
            variant="tertiary"
            text="Anmelden"
            type="button"
            onClick={() => navigate("/")}
            disabled={isLoading}
          />
        </div>
      </form>

      <p className="terms-notice">
        Durch Klicken auf die Schaltfläche "Weiter" stimmen Sie den
        Nutzungsbedingungen und der Datenschutzrichtlinie zu.
      </p>
    </div>
  );
};

export default RegisterForm;