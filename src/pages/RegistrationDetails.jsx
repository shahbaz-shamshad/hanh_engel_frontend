import React from 'react';
import Navbar from '../components/Navbar';
import AuthenticationLayout from '../layouts/Authentication';
import RegistrationDetailsForm from '../components/RegistrationDetailsForm';

const RegistrationDetailsPage = () => {
  return (
    <div>
      <Navbar />
      <AuthenticationLayout 
        imageSrc="/assets\registration-bg.svg"
      >
        <RegistrationDetailsForm />
      </AuthenticationLayout>
    </div>
  );
};

export default RegistrationDetailsPage;