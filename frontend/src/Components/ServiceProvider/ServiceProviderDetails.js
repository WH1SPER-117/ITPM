import React, { useState, useEffect } from 'react';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ServiceProviderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/serviceProviders/pending/${id}`);
        setProvider(response.data);
      } catch (err) {
        setError('Failed to fetch provider details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProviderDetails();
  }, [id]);

  if (loading) return <div className="text-center text-[#1e5470] mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!provider) return <div className="text-center text-[#1e5470] mt-10">Provider not found.</div>;

  return (
    <div className="bg-[#d1ecff] min-h-screen flex flex-col justify-between px-6">
      <Header />
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-2xl mt-12 mb-12">
        <h1 className="text-4xl font-bold text-[#1e5470] text-center mb-8">Service Provider Details</h1>
        <div className="space-y-6">
          <p className="text-lg"><strong>Name:</strong> {provider.name}</p>
          <p className="text-lg"><strong>NIC:</strong> {provider.nic}</p>
          <p className="text-lg"><strong>Date of Birth:</strong> {provider.dob}</p>
          <p className="text-lg"><strong>Address:</strong> {provider.address}</p>
          <p className="text-lg"><strong>Phone Number:</strong> {provider.phoneNo}</p>
          <p className="text-lg"><strong>Email:</strong> {provider.email}</p>
          <p className="text-lg"><strong>Service Category:</strong> {provider.serviceCategory}</p>
          <p className="text-lg"><strong>Services:</strong> {provider.service.join(', ')}</p>
          <p className="text-lg"><strong>Username:</strong> {provider.username}</p>
          <p className="text-lg"><strong>Created Date:</strong> {provider.createdDate}</p>
          <p className="text-lg"><strong>Approval Status:</strong> {provider.isApproved}</p>
        </div>
        <button
          className="mt-6 bg-[#34729c] text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300"
          onClick={() => navigate('/ApproveServiceProviders')}
        >
          Back to Approval List
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceProviderDetails;