import React, { useState, useEffect } from 'react';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2 } from 'lucide-react'; // Import trash bin icon

function ApproveServiceProviders() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null); // For approval confirmation
  const [rejectingId, setRejectingId] = useState(null); // For rejection confirmation
  const [localApproved, setLocalApproved] = useState({}); // Local checkbox state
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [categoryFilter, setCategoryFilter] = useState(''); // Filter by service category
  const [serviceFilter, setServiceFilter] = useState(''); // Filter by service type

  // Fetch pending service providers from backend
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/serviceProviders/pending');
        setProviders(response.data);
        const initialApproved = response.data.reduce((acc, provider) => ({
          ...acc,
          [provider.pendingServiceProviderID]: provider.isApproved === "Yes",
        }), {});
        setLocalApproved(initialApproved);
      } catch (err) {
        setError('Failed to fetch pending service providers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  // Toggle approval status with confirmation
  const toggleApproval = (id) => {
    setConfirmingId(id);
  };

  // Handle approval confirmation result
  const handleApprovalConfirmation = async (confirmed, id) => {
    setConfirmingId(null);
    if (!confirmed) {
      setLocalApproved(prev => ({ ...prev, [id]: false }));
      return;
    }

    setLocalApproved(prev => ({ ...prev, [id]: true }));
    try {
      const response = await axios.patch(`http://localhost:5000/serviceProviders/approve/${id}`, { isApproved: "Yes" });
      if (response.status === 201) {
        setProviders(providers.filter(provider => provider.pendingServiceProviderID !== id));
        alert('Service provider approved and moved to ServiceProvider collection!');
      }
    } catch (err) {
      setError('Failed to approve service provider');
      setLocalApproved(prev => ({ ...prev, [id]: false }));
      console.error(err);
    }
  };

  // Initiate rejection with confirmation
  const initiateRejection = (id) => {
    setRejectingId(id);
  };

  // Handle rejection confirmation result
  const handleRejectionConfirmation = async (confirmed, id) => {
    setRejectingId(null);
    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/serviceProviders/pending/${id}`);
      if (response.status === 200) {
        setProviders(providers.filter(provider => provider.pendingServiceProviderID !== id));
        alert('Service provider rejected and removed from pending list!');
      }
    } catch (err) {
      setError('Failed to reject service provider');
      console.error(err);
    }
  };

  // Get unique service categories and services for dropdowns
  const uniqueCategories = [...new Set(providers.map(provider => provider.serviceCategory))];
  const uniqueServices = [...new Set(providers.flatMap(provider => provider.service))];

  // Filter providers based on search term, category, and service
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.service.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !categoryFilter || provider.serviceCategory === categoryFilter;
    const matchesService = !serviceFilter || provider.service.includes(serviceFilter);
    return matchesSearch && matchesCategory && matchesService;
  });

  if (loading) return <div className="text-center text-[#1e5470] mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="bg-[#d1ecff] min-h-screen flex flex-col justify-between px-6">
      <Header />
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-2xl mt-12 mb-12">
        <h1 className="text-4xl font-bold text-[#1e5470] text-center mb-6">Approve Service Providers</h1>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by category or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34729c] text-[#1e5470] placeholder-[#1e5470]/50"
            />
          </div>
          <div className="w-full md:w-1/3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34729c] text-[#1e5470] bg-white"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/3">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34729c] text-[#1e5470] bg-white"
            >
              <option value="">All Services</option>
              {uniqueServices.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-[#6cb1da] text-white">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">NIC</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Approve</th>
              <th className="p-3 border">Reject</th>
              <th className="p-3 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.map((provider) => (
              <tr key={provider.pendingServiceProviderID} className="text-center border">
                <td className="p-3 border">{provider.name}</td>
                <td className="p-3 border">{provider.nic}</td>
                <td className="p-3 border">{provider.email}</td>
                <td className="p-3 border">{provider.phoneNo}</td>
                <td className="p-3 border">
                  <input
                    type="checkbox"
                    checked={localApproved[provider.pendingServiceProviderID] || provider.isApproved === "Yes"}
                    onChange={() => toggleApproval(provider.pendingServiceProviderID)}
                    disabled={provider.isApproved === "Yes"}
                  />
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => initiateRejection(provider.pendingServiceProviderID)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                    disabled={provider.isApproved === "Yes"}
                  >
                    <Trash2 className="h-5 w-5 mx-auto" />
                  </button>
                </td>
                <td className="p-3 border">
                  <button
                    className="text-[#34729c] underline hover:text-[#6ec1d1] transition duration-300"
                    onClick={() => navigate(`/ServiceProviderDetails/${provider.pendingServiceProviderID}`)}
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProviders.length === 0 && <p className="text-center text-[#1e5470] mt-4">No matching service providers.</p>}
      </div>
      <Footer />

      {/* Approval Confirmation Modal */}
      {confirmingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#1e5470] mb-4">Confirm Approval</h2>
            <p className="text-[#1e5470] mb-6">Are you sure you want to approve this service provider? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-[#6cb1da] text-white py-2 px-4 rounded-lg hover:bg-[#6ec1d1] transition duration-300"
                onClick={() => handleApprovalConfirmation(true, confirmingId)}
              >
                Yes, Approve
              </button>
              <button
                className="bg-[#34729c] text-white py-2 px-4 rounded-lg hover:bg-[#6ec1d1] transition duration-300"
                onClick={() => handleApprovalConfirmation(false, confirmingId)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Confirmation Modal */}
      {rejectingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#1e5470] mb-4">Confirm Rejection</h2>
            <p className="text-[#1e5470] mb-6">Are you sure you want to reject this service provider? This action will permanently delete their record.</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                onClick={() => handleRejectionConfirmation(true, rejectingId)}
              >
                Reject Provider
              </button>
              <button
                className="bg-[#34729c] text-white py-2 px-4 rounded-lg hover:bg-[#6ec1d1] transition duration-300"
                onClick={() => handleRejectionConfirmation(false, rejectingId)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApproveServiceProviders;