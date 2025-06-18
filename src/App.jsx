import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ForgotPasswordPage from "./pages/ForgotPassword";
import RegisterPage from "./pages/Register";
import EmailVerificationPage from "./pages/EmailVerification";
import RegistrationDetailsPage from "./pages/RegistrationDetails";
import CategoryPage from "./pages/Category";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/registration-details"element={<RegistrationDetailsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
