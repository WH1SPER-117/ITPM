import { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    address: "",
    username: "",
    password: ""
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await axios.put(`http://localhost:5000/users/${selectedUser._id}`, formData);
      } else {
        await axios.post("http://localhost:5000/users", formData);
      }
      fetchUsers();
      setFormData({ name: "", email: "", contactNo: "", address: "", username: "", password: "" });
      setSelectedUser(null);
    } catch (error) {
      console.error("Error submitting user data", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-xl font-bold text-center mb-4">User Management</h1>
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
        <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="Contact No" className="border p-2 rounded" required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded" required />
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="border p-2 rounded" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{selectedUser ? "Update User" : "Add User"}</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="flex justify-between items-center border-b py-2">
            <span>{user.name} - {user.email}</span>
            <div>
              <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
