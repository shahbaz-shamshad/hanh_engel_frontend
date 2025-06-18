import React, { useState } from "react";
import "../css/LoginForm.css";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Here: ${import.meta.env.VITE_API_URL}');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        email,
        password,
      });
      const responseData = response.data;

      if (responseData.success) {
        const token = responseData.data;
        localStorage.setItem("token", token);
        navigate("/category");
        console.log("Login successful", token);
      } else {
        console.error("Login failed:", responseData.message);
        alert("Login failed: " + responseData.message);
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data?.message || error.message);
      alert("Login failed: " + error.response.data.message);
    }
  };

  return (
    <div className="login-form">
      <h1>Anmelden</h1>

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

        <div className="form-group">
          <label htmlFor="password">PASSWORT</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="form-options">
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember">Anmelden speichern</label>
          </div>
          <a href="/forgot-password" className="forgot-password">
            Passwort vergessen?
          </a>
        </div>

        {/* <button type="submit" className="login-button">Anmelden</button>
        <button type="button" className="register-button">Registrieren</button> */}
        <div className="button-container">
          <Button
            variant="primary"
            text="Anmelden"
            type="submit"
            onClick={handleSubmit}
          />
          <Button
            variant="tertiary"
            text="Registrieren"
            type="button"
            onClick={() => navigate("/register")}
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

export default LoginForm;