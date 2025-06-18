import React from 'react';
import Navbar from '../components/Navbar';
import AuthenticationLayout from '../layouts/Authentication';
import EmailVerificationForm from '../components/EmailVerificationForm';

const EmailVerificationPage = () => {
  return (
    <div>
      <Navbar />
      <AuthenticationLayout 
        imageSrc="src/assets/registration-bg.svg"
      >
        <EmailVerificationForm email="hey@sevengb.de" />
      </AuthenticationLayout>
    </div>
  );
};

export default EmailVerificationPage;