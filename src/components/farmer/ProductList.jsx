import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../../context/AppContext';

const ProductList = ({ products, onEdit }) => {
  const { editProduct, deleteProduct } = useAppContext();
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">My Products</h3>
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No products added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              showActions={true}
              onEdit={onEdit}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;