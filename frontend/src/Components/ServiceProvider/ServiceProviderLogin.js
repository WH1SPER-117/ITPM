import React, { useState } from 'react';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ServiceProviderLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/serviceProviders/login', credentials);
      if (response.status === 200) {
        alert('Login successful! Redirecting to profile...');
        navigate('/ServiceProviderProfile'); // Redirect to profile page (implement separately if needed)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#d1ecff] min-h-screen flex flex-col justify-between px-6">
      <Header />
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-2xl mt-12 mb-12">
        <h1 className="text-3xl font-bold text-[#1e5470] text-center mb-6">Service Provider Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-[#1e5470] text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34729c] text-[#1e5470] placeholder-[#1e5470]/50"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#1e5470] text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#34729c] text-[#1e5470] placeholder-[#1e5470]/50"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#34729c] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-[#1e5470] mt-4">
          Don’t have an account?{' '}
          <Link to="/ServiceProviderSignUp" className="text-[#6cb1da] hover:text-[#6ec1d1] underline">
            Sign Up
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceProviderLogin;