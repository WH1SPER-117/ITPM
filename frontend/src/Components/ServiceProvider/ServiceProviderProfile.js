import React from 'react';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useNavigate } from 'react-router-dom';

function ServiceProviderProfile() {
  const navigate = useNavigate();
  const serviceProvider = {
    id: 9,
    name: "Binuka Kumar",
    nic: "2234567780V",
    dob: "2013-05-15",
    address: "12 Temple Street, Colombo",
    phoneNo: "+94775541887",
    email: "binuka@gmail.com",
    serviceCategory: "Electrical",
    services: ["Wiring", "Safety Inspections"],
  };

  return (
    <div className="bg-[#d1ecff] min-h-screen flex flex-col justify-between px-6">
      <Header />
      <div className="max-w-5xl mx-auto bg-white p-14 rounded-lg shadow-2xl mt-12 mb-12 flex flex-col items-center">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrsaTeFqurvUDvMYOcgZAd-JPf-dtLogrrog&s" 
          alt="Service Provider" 
          className="w-44 h-44 rounded-full border-4 border-[#6cb1da] shadow-lg mb-6 object-cover"
        />
        <h2 className="text-5xl font-bold text-[#1e5470] text-center mb-6">{serviceProvider.name}</h2>
        <div className="space-y-5 text-lg w-full px-16">
          <p><strong className="text-[#34729c]">NIC:</strong> {serviceProvider.nic}</p>
          <p><strong className="text-[#34729c]">Date of Birth:</strong> {serviceProvider.dob}</p>
          <p><strong className="text-[#34729c]">Address:</strong> {serviceProvider.address}</p>
          <p><strong className="text-[#34729c]">Phone No:</strong> {serviceProvider.phoneNo}</p>
          <p><strong className="text-[#34729c]">Email:</strong> {serviceProvider.email}</p>
          <p><strong className="text-[#34729c]">Service Category:</strong> {serviceProvider.serviceCategory}</p>
          <p><strong className="text-[#34729c]">Services:</strong> {serviceProvider.services.join(", ")}</p>
        </div>
        <button onClick={() => navigate('/AdminDashboard')} 
          className="w-2/3 mt-10 bg-[#6cb1da] text-white py-4 rounded-lg text-xl font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300">
          Manage My Account
          
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceProviderProfile;

