import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#d1ecff] min-h-screen flex flex-col justify-between px-6">
      <Header />
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-2xl mt-12 mb-12">
        <h1 className="text-4xl font-bold text-[#1e5470] text-center mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-2 gap-6">
          <button onClick={() => navigate('/ApproveServiceProviders')} className="bg-[#6cb1da] text-white p-6 rounded-lg text-xl font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300">
            Service Provider Management
          </button>
          <button className="bg-[#6cb1da] text-white p-6 rounded-lg text-xl font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300">
            Service Catalog Management
          </button>
          <button className="bg-[#6cb1da] text-white p-6 rounded-lg text-xl font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300">
            Reports
          </button>
          <button className="bg-[#6cb1da] text-white p-6 rounded-lg text-xl font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300">
            Commissions
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
