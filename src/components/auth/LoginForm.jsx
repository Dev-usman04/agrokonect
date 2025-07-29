import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const LoginForm = ({ userType }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      login({
        name: formData.email.split('@')[0],
        email: formData.email,
        type: userType,
        id: Date.now(),
        rating: 4.8,
        location: 'Ibadan',
        joinedDate: '2024-01-15'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
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
      <button
  type="submit"
  className="w-full bg-purple-600 text-white py-3 px-6 rounded-md font-medium text-base hover:bg-purple-700 transition-colors duration-300"
>
  Login
</button>

    </form>
  );
};

export default LoginForm;