// src/components/admin/UserManagement.js
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const initialUser = {
  name: '',
  email: '',
  type: 'Farmer',
  location: '',
  joined: '',
  status: 'Active'
};

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [users, setUsers] = useState([
    { name: 'John Adebayo', email: 'john@example.com', type: 'Farmer', location: 'Ibadan', joined: '2024-01-15', status: 'Active' },
    { name: 'Fatima Hassan', email: 'fatima@example.com', type: 'Farmer', location: 'Kaduna', joined: '2024-02-20', status: 'Active' },
    { name: 'Mike Johnson', email: 'mike@example.com', type: 'Buyer', location: 'Lagos', joined: '2024-03-10', status: 'Active' },
    { name: 'Sarah Williams', email: 'sarah@example.com', type: 'Buyer', location: 'Abuja', joined: '2024-04-05', status: 'Active' },
    { name: 'Admin User', email: 'admin@example.com', type: 'Admin', location: 'Lagos', joined: '2024-01-01', status: 'Active' }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState(initialUser);
  const [formErrors, setFormErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || user.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getUserTypeColor = (type) => {
    switch (type) {
      case 'Farmer': return 'bg-primary-100 text-primary-800';
      case 'Buyer': return 'bg-blue-100 text-blue-800';
      case 'Admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openAddModal = () => {
    setEditUser(null);
    setFormData(initialUser);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setFormData(user);
    setFormErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditUser(null);
    setFormData(initialUser);
    setFormErrors({});
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.type) errors.type = 'User type is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (editUser) {
      setUsers(users.map(u => u.email === editUser.email ? { ...formData } : u));
      setFeedback('User updated successfully!');
    } else {
      if (users.some(u => u.email === formData.email)) {
        setFormErrors({ email: 'Email already exists' });
        return;
      }
      setUsers([
        ...users,
        { ...formData, joined: new Date().toISOString().split('T')[0], status: 'Active' }
      ]);
      setFeedback('User added successfully!');
    }
    closeModal();
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.email !== email));
      setFeedback('User deleted successfully!');
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">User Management</h3>
        <div className="flex space-x-2">
          <button className="btn-primary" onClick={openAddModal}>Add User</button>
          <button className="btn-outline">Export Data</button>
        </div>
      </div>

      {feedback && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded shadow text-center">{feedback}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card p-4 text-center">
          <h4 className="text-lg font-semibold text-primary-600">Farmers</h4>
          <p className="text-2xl font-bold">{users.filter(u => u.type === 'Farmer').length}</p>
        </div>
        <div className="card p-4 text-center">
          <h4 className="text-lg font-semibold text-blue-600">Buyers</h4>
          <p className="text-2xl font-bold">{users.filter(u => u.type === 'Buyer').length}</p>
        </div>
        <div className="card p-4 text-center">
          <h4 className="text-lg font-semibold text-purple-600">Admins</h4>
          <p className="text-2xl font-bold">{users.filter(u => u.type === 'Admin').length}</p>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">All Users</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input"
              >
                <option value="all">All Types</option>
                <option value="Farmer">Farmers</option>
                <option value="Buyer">Buyers</option>
                <option value="Admin">Admins</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge ${getUserTypeColor(user.type)}`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" onClick={() => openEditModal(user)}>Edit</button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(user.email)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center px-6 py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit User */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={closeModal}>×</button>
            <h3 className="text-xl font-bold mb-4">{editUser ? 'Edit User' : 'Add User'}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className={`input w-full ${formErrors.name ? 'border-red-500' : ''}`}
              />
              {formErrors.name && <div className="text-red-500 text-xs ml-1">{formErrors.name}</div>}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className={`input w-full ${formErrors.email ? 'border-red-500' : ''}`}
                disabled={!!editUser}
              />
              {formErrors.email && <div className="text-red-500 text-xs ml-1">{formErrors.email}</div>}
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className={`input w-full ${formErrors.location ? 'border-red-500' : ''}`}
              />
              {formErrors.location && <div className="text-red-500 text-xs ml-1">{formErrors.location}</div>}
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className={`input w-full ${formErrors.type ? 'border-red-500' : ''}`}
              >
                <option value="Farmer">Farmer</option>
                <option value="Buyer">Buyer</option>
                <option value="Admin">Admin</option>
              </select>
              {formErrors.type && <div className="text-red-500 text-xs ml-1">{formErrors.type}</div>}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editUser ? 'Update' : 'Add User'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
