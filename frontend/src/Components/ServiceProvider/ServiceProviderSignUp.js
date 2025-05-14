import React, { useState } from 'react';
import Header from '../Home/Header';
import Footer from '../Home/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ServiceProviderSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    dob: '',
    address: '',
    phoneNo: '',
    email: '',
    serviceCategory: '',
    service: [],
    username: '',
    password: '',
    confirmPassword: ''
  });

  const serviceOptions = {
    "Plumbing": ["Leak Repairs", "Pipe Installation", "Drain Cleaning"],
    "Electrical": ["Wiring", "Lighting Installation", "Safety Inspections"],
    "Cleaning": ["Deep Cleaning", "Regular Maintenance", "Move-in/out"],
    "Painting": ["Interior", "Exterior", "Decorative Finishes"],
    "Gardening": ["Landscaping", "Maintenance", "Design"],
    "Carpentry": ["Custom Furniture", "Repairs", "Installations"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, serviceCategory: selectedCategory, service: [] });
  };

  const handleServiceChange = (service) => {
    setFormData((prevState) => {
      const updatedServices = prevState.service.includes(service)
        ? prevState.service.filter((s) => s !== service)
        : [...prevState.service, service];
      return { ...prevState, service: updatedServices };
    });
  };

  const validateForm = () => {
    const { email, nic, phoneNo, password, confirmPassword, service } = formData;

    if (!email.includes('@')) {
      alert("Enter a valid email address with '@'");
      return false;
    }

    if (nic.length > 12) {
      alert("NIC cannot be more than 12 characters");
      return false;
    }

    if (!/^\+?\d+$/.test(phoneNo)) {
      alert("Phone number must contain only numbers or start with '+' followed by numbers");
      return false;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    if (service.length === 0) {
      alert("Please select at least one service");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Exclude confirmPassword from data sent to backend
    const { confirmPassword, ...dataToSend } = formData;

    try {
      const response = await axios.post('http://localhost:5000/serviceProviders/register', dataToSend);
      alert('Sign-up successful! Redirecting to login.');
      console.log(response.data);
      navigate('/ServiceProviderLogin');
    } catch (error) {
      console.error('Error signing up:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during sign-up';
      alert(errorMessage);
    }
  };

  return (
    <div className="bg-[#d1ecff] min-h-screen flex flex-col justify-between">
      <Header />
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10 mb-10">
        <h2 className="text-3xl font-bold text-[#1e5470] text-center mb-6">Sign Up as a Service Provider</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Name" required className="w-full p-3 border rounded-lg" onChange={handleChange} />
          <input name="nic" type="text" placeholder="NIC" required className="w-full p-3 border rounded-lg" onChange={handleChange} />
          <input name="dob" type="date" required className="w-full p-3 border rounded-lg" onChange={handleChange} />
          <input name="address" type="text" placeholder="Address" required className="w-full p-3 border rounded-lg" onChange={handleChange} />
          <input name="phoneNo" type="text" placeholder="Phone No." required className="w-full p-3 border rounded-lg" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded-lg" onChange={handleChange} />
          
          <select name="serviceCategory" required className="w-full p-3 border rounded-lg" onChange={handleCategoryChange}>
            <option value="">Select Service Category</option>
            {Object.keys(serviceOptions).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <div className="flex flex-wrap gap-3">
            {serviceOptions[formData.serviceCategory]?.map((service) => (
              <label key={service} className="flex items-center space-x-2">
                <input type="checkbox" className="w-5 h-5" checked={formData.service.includes(service)} onChange={() => handleServiceChange(service)} />
                <span>{service}</span>
              </label>
            ))}
          </div>

          <input name="username" type="text" placeholder="Create Username" required className="w-full p-3 border rounded-lg" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required className="w-full p-3 border rounded-lg" onChange={handleChange} />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" required className="w-full p-3 border rounded-lg" onChange={handleChange} />
          
          <button type="submit" className="w-full bg-[#6cb1da] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#6ec1d1] transition duration-300">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceProviderSignUp;