import React from "react";
import Navbar from "../components/Navbar";
import AuthenticationLayout from "../layouts/Authentication";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="forgot-password-page">
      <Navbar />
      <AuthenticationLayout imageSrc="src/assets/registration-bg.svg">
        <ForgotPasswordForm />
      </AuthenticationLayout>
    </div>
  );
};

export default ForgotPasswordPage;
