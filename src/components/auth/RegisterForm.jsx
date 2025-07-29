import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const RegisterForm = ({ userType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: ''
  });
  const { login } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      login({
        ...formData,
        type: userType,
        id: Date.now(),
        rating: 5.0,
        joinedDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="input w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        className="input w-full"
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        className="input w-full"
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({...formData, location: e.target.value})}
        className="input w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        className="input w-full"
        required
      />
      <button type="submit" className="btn-primary w-full">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;