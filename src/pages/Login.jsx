import React from "react";
import Navbar from "../components/Navbar";
import AuthenticationLayout from "../layouts/Authentication";
import LoginForm from "../components/LoginForm";
import "../css/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <Navbar />
      <AuthenticationLayout imageSrc="/assets/registration-bg.svg">
        <LoginForm />
      </AuthenticationLayout>
    </div>
  );
};

export default LoginPage;
