import React, { useState } from 'react';
import { Calendar, MapPin, Star, ShoppingCart, MessageCircle, Heart, Eye } from 'lucide-react';

const ProductCard = ({ product, showActions = true, onOrder, onChat, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-3 h-3 fill-amber-400/50 text-amber-400" />
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3 h-3 text-slate-600" />
      );
    }
    
    return stars;
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
   
      <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
        
    
        <div className="relative overflow-hidden">
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
       
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
         
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-500/80 text-white' 
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 bg-slate-800/60 backdrop-blur-md rounded-full text-slate-300 hover:bg-slate-700/60 transition-all duration-200">
              <Eye className="w-4 h-4" />
            </button>
          </div>

         
          <div className="absolute top-4 left-4">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
              product.quantity > 50 
                ? 'bg-emerald-500/80 text-white' 
                : product.quantity > 10 
                ? 'bg-amber-500/80 text-white' 
                : 'bg-red-500/80 text-white'
            }`}>
              {product.quantity > 50 ? 'In Stock' : product.quantity > 10 ? 'Low Stock' : 'Limited'}
            </div>
          </div>

         
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-1 bg-slate-800/80 backdrop-blur-md rounded-full px-3 py-1">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-white text-xs font-medium ml-1">{product.rating}</span>
            </div>
          </div>
        </div>

      
        <div className="p-6 space-y-4">
          
          <div className="space-y-2">
            <h4 className="font-bold text-xl text-white group-hover:text-emerald-400 transition-colors duration-200">
              {product.name}
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {product.price}
              </span>
              <span className="text-slate-400 text-sm font-medium">
                per unit
              </span>
            </div>
          </div>

          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Available Quantity</span>
              <span className="text-white font-semibold">{product.quantity} units</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-1 bg-slate-700/50 rounded-lg">
                <MapPin className="w-3 h-3 text-emerald-400" />
              </div>
              <span className="text-slate-300 text-sm">{product.location}</span>
            </div>

            {product.harvestDate && (
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-slate-700/50 rounded-lg">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-slate-300 text-sm">Harvested: {product.harvestDate}</span>
              </div>
            )}
          </div>

          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Stock Level</span>
              <span className="text-xs text-slate-400">{Math.min(Math.round((product.quantity / 100) * 100), 100)}%</span>
            </div>
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  product.quantity > 50 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                    : product.quantity > 10 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}
                style={{ width: `${Math.min((product.quantity / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

         
          {showActions && (
            <div className="flex space-x-3 pt-2">
              {onOrder && (
                <button
                  onClick={() => onOrder(product)}
                  className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Order Now</span>
                  </div>
                </button>
              )}
              {onChat && (
                <button
                  onClick={() => onChat(product)}
                  className="group/btn relative overflow-hidden bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <div className="relative flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                </button>
              )}
              {onEdit && (
                <button
                  onClick={() => onEdit(product)}
                  className="group/btn relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(product.id)}
                  className="group/btn relative overflow-hidden bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>

      
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none rounded-3xl"></div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;