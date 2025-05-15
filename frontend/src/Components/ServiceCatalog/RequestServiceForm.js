import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const RequestServiceForm = () => {
const { categoryName } = useParams();
const [serviceName, setServiceName] = useState('');
const [issueDescription, setIssueDescription] = useState('');
const [urgency, setUrgency] = useState('Low');
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post('http://localhost:5000/api/service-requests', {
        categoryName,
        serviceName,
        issueDescription,
        urgency,
    });
    alert('Request submitted!');
    navigate('/');
    } catch (err) {
    console.error('Submission error:', err);
    alert('Failed to submit request.');
    }
};

return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#1e5470]">
            Request a Service - {categoryName}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
    <div>
        <label className="block text-sm font-medium text-gray-700">Service Name</label>
        <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6cb1da]"
        />
    </div>
    <div>
        <label className="block text-sm font-medium text-gray-700">Issue Description</label>
        <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6cb1da]"
        />
    </div>
    <div>
        <label className="block text-sm font-medium text-gray-700">Urgency</label>
        <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6cb1da]"
        >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
        </select>
    </div>
        <button
        type="submit"
        className="w-full bg-[#34729c] text-white py-2 px-4 rounded-md hover:bg-[#1e5470] transition"
        >
        Submit Request
        </button>
    </form>
    </div>
);
};

export default RequestServiceForm;
