import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

function ServiceProviderVerify() {
  const navigate = useNavigate();

  return (
    <div className="bg-muted min-h-screen flex flex-col justify-between">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-md mt-10 mb-10 text-center">
        <h2 className="text-3xl font-bold text-blue-dark mb-6 animate-fade-in">
          Thank You for Registering!
        </h2>
        <p className="text-lg text-blue-dark mb-8">
          We're currently verifying your details as a service provider. This process will be completed within a maximum of one day. Once verification is complete, you can log in using your username and password.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/ServiceProviderLogin')}
            className="bg-primary text-primary-foreground py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-accent transition duration-300 animate-fade-in-left"
          >
            Redirect to Login
          </button>
          <button
            onClick={() => navigate('/ContactUs')}
            className="bg-secondary text-secondary-foreground py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-accent transition duration-300 animate-fade-in-right"
          >
            Inquiry
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ServiceProviderVerify;