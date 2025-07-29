import React from 'react';
import { useAppContext } from '../../context/AppContext';
import SearchFilters from './SearchFilters';
import ProductGrid from './ProductGrid';

const Marketplace = () => {
  const { products, searchTerm, filterCategory } = useAppContext();

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <SearchFilters />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default Marketplace;