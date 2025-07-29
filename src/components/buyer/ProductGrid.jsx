import React from 'react';
import { useAppContext } from '../../context/AppContext';
import ProductCard from '../farmer/ProductCard';

const ProductGrid = ({ products }) => {
  const { addOrder, openChat, currentUser } = useAppContext();

  const handleOrder = (product) => {
    const order = {
      id: Date.now(),
      product,
      buyer: currentUser.name,
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    addOrder(order);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No products found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onOrder={handleOrder}
          onChat={openChat}
        />
      ))}
    </div>
  );
};

export default ProductGrid;