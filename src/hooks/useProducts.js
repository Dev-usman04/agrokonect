import { useAppContext } from '../context/AppContext';
import { searchProducts } from '../utils/helpers';

export const useProducts = () => {
  const { products, searchTerm, filterCategory, addProduct, currentUser } = useAppContext();

  const filteredProducts = searchProducts(products, searchTerm, filterCategory);
  const userProducts = products.filter(p => p.farmer === currentUser?.name);

  const createProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      farmer: currentUser.name,
      location: currentUser.location,
      rating: currentUser.rating,
      image: `https://via.placeholder.com/300x200?text=${productData.name.replace(' ', '+')}`,
      harvestDate: new Date().toISOString().split('T')[0]
    };
    addProduct(newProduct);
  };

  return {
    products,
    filteredProducts,
    userProducts,
    createProduct
  };
};