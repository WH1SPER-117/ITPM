import React, { useState } from 'react';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useNavigate } from 'react-router-dom';

function ApproveServiceProviders() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([
    { id: 1, name: 'Binuka Kumar', nic: '2234567780V', email: 'binuka@gmail.com', address: '12 Temple Street, Colombo', phone: '+94775541887', approved: false },
    { id: 2, name: 'Kamal Silva', nic: '987654321V', email: 'kamal@gmail.com', address: '23 Flower Rd, Kandy', phone: '+94776543210', approved: false },
    { id: 3, name: 'Nimal Fernando', nic: '456123789V', email: 'nimal@gmail.com', address: '78 Park Avenue, Galle', phone: '+94779876543', approved: false },
    { id: 4, name: 'Sunil Jayasuriya', nic: '741852963V', email: 'sunil@gmail.com', address: '12 High Street, Negombo', phone: '+94775551234', approved: false }
  ]);

  const toggleApproval = (id) => {
    setProviders(providers.map(provider => 
      provider.id === id ? { ...provider, approved: !provider.approved } : provider
    ));
  };

  return (
    <div className="bg-[#d1ecff] min-h-screen flex flex-col justify-between px-6">
      <Header />
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-2xl mt-12 mb-12">
        <h1 className="text-4xl font-bold text-[#1e5470] text-center mb-8">Approve Service Providers</h1>
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-[#6cb1da] text-white">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">NIC</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Approve</th>
              <th className="p-3 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id} className="text-center border">
                <td className="p-3 border">{provider.name}</td>
                <td className="p-3 border">{provider.nic}</td>
                <td className="p-3 border">{provider.email}</td>
                <td className="p-3 border">{provider.phone}</td>
                <td className="p-3 border">
                  <input type="checkbox" checked={provider.approved} onChange={() => toggleApproval(provider.id)} />
                </td>
                <td className="p-3 border">
                  <button className="text-[#34729c] underline" onClick={() => navigate(`/provider-details/${provider.id}`)}>View More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default ApproveServiceProviders;
