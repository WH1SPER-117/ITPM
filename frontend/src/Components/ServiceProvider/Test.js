import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

function Test() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#d1ecff] min-h-screen flex flex-col justify-between">
      <Header />
      <div className="flex flex-col items-center text-center py-20 px-5">
        <h1 className="text-4xl font-bold text-[#1e5470] mb-4">Earn Money Your Way</h1>
        <h2 className="text-2xl text-[#34729c] mb-6">Find Jobs for your expertise</h2>
        <button 
          onClick={() => navigate('/ServiceProviderSignUp')} 
          className="bg-[#6cb1da] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300">
          Get Started
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Test;
