export const formatPrice = (price) => {
  if (typeof price === 'number') {
    return `₦${price.toLocaleString()}`;
  }
  return price;
};

export const formatDate = (date) => {
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString('en-GB');
  }
  return date.toLocaleDateString('en-GB');
};

export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^[\+]?[1-9][\d]{0,15}$/.test(phone);
};

export const searchProducts = (products, searchTerm, category) => {
  return products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};