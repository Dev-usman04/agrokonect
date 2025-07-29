import React from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

const SearchFilters = () => {
  const { searchTerm, filterCategory, setSearchTerm, setFilterCategory } = useAppContext();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products or farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="input md:w-48"
      >
        {PRODUCT_CATEGORIES.map(cat => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilters;