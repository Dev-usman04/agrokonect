import React, { useState } from 'react';
import { Package, DollarSign, Hash, Tag, FileText, Plus, Sparkles, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

const ProductForm = ({ editProduct, setEditProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { addProduct, editProduct: editProductAction, currentUser } = useAppContext();

  React.useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || '',
        price: editProduct.price || '',
        quantity: editProduct.quantity || '',
        category: editProduct.category || '',
        description: editProduct.description || ''
      });
    } else {
      setFormData({ name: '', price: '', quantity: '', category: '', description: '' });
    }
  }, [editProduct]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.quantity.trim() || isNaN(Number(formData.quantity))) newErrors.quantity = 'Valid quantity is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      if (editProduct) {
        editProductAction({
          ...editProduct,
          ...formData,
          image: editProduct.image,
          farmer: currentUser.name,
          location: currentUser.location,
          rating: currentUser.rating,
          harvestDate: editProduct.harvestDate || new Date().toISOString().split('T')[0]
        });
        setShowSuccess(true);
        setEditProduct(null);
      } else {
        const product = {
          ...formData,
          farmer: currentUser.name,
          location: currentUser.location,
          rating: currentUser.rating,
          image: `https://via.placeholder.com/300x200?text=${formData.name.replace(' ', '+')}`,
          harvestDate: new Date().toISOString().split('T')[0]
        };
        addProduct(product);
        setShowSuccess(true);
      }
      setFormData({ name: '', price: '', quantity: '', category: '', description: '' });
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const formFields = [
    {
      name: 'name',
      placeholder: 'Product Name',
      icon: Package,
      type: 'text',
      required: true,
      color: 'text-emerald-400'
    },
    {
      name: 'price',
      placeholder: 'Price (e.g., ₦50/kg)',
      icon: DollarSign,
      type: 'text',
      required: true,
      color: 'text-cyan-400'
    },
    {
      name: 'quantity',
      placeholder: 'Quantity (e.g., 200kg)',
      icon: Hash,
      type: 'text',
      required: true,
      color: 'text-violet-400'
    }
  ];

  return (
    <div className="relative group">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
      
      <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-slate-600/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-500/30">
              <Plus className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <p className="text-slate-400">{editProduct ? 'Update your product details' : 'List your fresh produce for buyers'}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 bg-slate-700/50 rounded-2xl px-4 py-2 border border-slate-600/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300 text-sm">Quick Add</span>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 relative overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-emerald-400 font-semibold">Product added successfully!</p>
                  <p className="text-emerald-300/80 text-sm">Your product is now live for buyers to see.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formFields.map((field) => (
              <div key={field.name} className="group/field relative">
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-slate-700/50 rounded-lg ${field.color}`}>
                    <field.icon className="w-4 h-4" />
                  </div>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    className={`w-full bg-slate-700/40 border ${errors[field.name] ? 'border-red-500' : 'border-slate-600/50'} rounded-2xl py-4 pl-16 pr-4 text-white placeholder-slate-400 focus:border-slate-500/70 focus:bg-slate-700/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                    required={field.required}
                  />
                  {errors[field.name] && (
                    <div className="text-red-400 text-xs mt-1 ml-2">{errors[field.name]}</div>
                  )}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-focus-within/field:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Category Selection */}
          <div className="relative group/field">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-slate-700/50 rounded-lg text-amber-400">
                <Tag className="w-4 h-4" />
              </div>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`w-full bg-slate-700/40 border ${errors.category ? 'border-red-500' : 'border-slate-600/50'} rounded-2xl py-4 pl-16 pr-4 text-white focus:border-slate-500/70 focus:bg-slate-700/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer`}
                required
              >
                <option value="" className="bg-slate-800">Select Category</option>
                {PRODUCT_CATEGORIES.slice(1).map(cat => (
                  <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                ))}
              </select>
              {errors.category && (
                <div className="text-red-400 text-xs mt-1 ml-2">{errors.category}</div>
              )}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-focus-within/field:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </div>

          {/* Description Field */}
          <div className="relative group/field">
            <div className="relative">
              <div className="absolute left-4 top-6 p-2 bg-slate-700/50 rounded-lg text-violet-400">
                <FileText className="w-4 h-4" />
              </div>
              <textarea
                placeholder="Product Description (Optional)"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-700/40 border border-slate-600/50 rounded-2xl py-4 pl-16 pr-4 text-white placeholder-slate-400 focus:border-slate-500/70 focus:bg-slate-700/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                rows="4"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-violet-500/0 opacity-0 group-focus-within/field:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </div>

          {/* Submit Button and Form Tips */}
          <>
            <div className="pt-4 flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                onClick={handleSubmit}
                className="group/btn w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 hover:shadow-2xl hover:shadow-emerald-500/25 active:scale-98 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{editProduct ? 'Updating...' : 'Adding Product...'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>{editProduct ? 'Update Product' : 'Add Product to Marketplace'}</span>
                    </>
                  )}
                </div>
              </button>
              {editProduct && (
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="w-32 py-4 px-4 rounded-2xl bg-slate-600 text-white font-bold hover:bg-slate-700 transition-all duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
            {/* Form Tips */}
            <div className="mt-6 p-4 bg-slate-700/20 rounded-2xl border border-slate-600/30">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-cyan-500/20 rounded-lg">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-cyan-400 font-medium text-sm">Pro Tips</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Add clear descriptions and competitive pricing to attract more buyers. Fresh produce sells faster!
                  </p>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;