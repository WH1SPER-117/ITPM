import React, { useState } from 'react';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useNavigate } from 'react-router-dom';

function ServiceProviderLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const hardcodedUsername = "binuka_kumar";
  const hardcodedPassword = "Binuka123#";

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === hardcodedUsername && password === hardcodedPassword) {
      setMessage("Successfully Logged In");
      navigate('/ServiceProviderProfile');

    } else {
      setMessage("Invalid Username or Password");
    }
  };

  return (
    <div className="bg-[#d1ecff] min-h-screen flex flex-col justify-between">
      <Header />
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-20 mb-20">
        <h2 className="text-3xl font-bold text-[#1e5470] text-center mb-6">Service Provider Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6cb1da]" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6cb1da]" 
          />
          {message && <p className={`text-center ${message.includes("Success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
          <button 
            type="submit" 
            className="w-full bg-[#6cb1da] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300">
            Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceProviderLogin;
