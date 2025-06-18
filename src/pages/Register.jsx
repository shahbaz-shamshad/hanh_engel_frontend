import React from 'react';
import Navbar from '../components/Navbar';
import AuthenticationLayout from '../layouts/Authentication';
import RegisterForm from '../components/RegisterForm';
import '../css/RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Navbar />
      <AuthenticationLayout 
        imageSrc="src/assets/registration-bg.svg"
      >
        <RegisterForm />
      </AuthenticationLayout>
    </div>
  );
};

export default RegisterPage;