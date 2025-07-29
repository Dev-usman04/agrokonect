import React, { useState } from 'react';
import { Package, DollarSign, ShoppingCart, Star, TrendingUp, Users, Calendar } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import StatsCard from '../shared/StatsCard';

const FarmerDashboard = () => {
  const { currentUser, products, orders, activeTab } = useAppContext();
  const [editProduct, setEditProduct] = useState(null);
  
  const farmerProducts = products.filter(p => p.farmer === currentUser.name);
  const farmerOrders = orders.filter(o => o.product.farmer === currentUser.name);

  const stats = [
    {
      title: 'Total Products',
      value: farmerProducts.length,
      icon: Package,
      color: 'text-emerald-400',
      gradient: 'from-emerald-500/20 to-green-500/20',
      accent: 'from-emerald-500 to-green-500'
    },
    {
      title: 'Total Sales',
      value: '₦45,000',
      icon: DollarSign,
      color: 'text-cyan-400',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      accent: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Orders',
      value: farmerOrders.length,
      icon: ShoppingCart,
      color: 'text-violet-400',
      gradient: 'from-violet-500/20 to-purple-500/20',
      accent: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Rating',
      value: currentUser.rating,
      icon: Star,
      color: 'text-amber-400',
      gradient: 'from-amber-500/20 to-yellow-500/20',
      accent: 'from-amber-500 to-yellow-500'
    }
  ];

  if (activeTab === 'products') {
    return <ProductList products={farmerProducts} onEdit={setEditProduct} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-slate-400 text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
              Your farming business overview
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-800/50 rounded-2xl px-4 py-2 border border-slate-700/50">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300 text-sm">Today</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/50 rounded-2xl px-4 py-2 border border-slate-700/50">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 text-sm">{farmerOrders.length} Active Orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="group relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50`}></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} border border-slate-600/30`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm font-medium">{stat.title}</div>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Performance</span>
                  <span className="text-xs text-emerald-400">+12%</span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.accent} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min(85 + index * 5, 95)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-slate-600/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Package className="w-6 h-6 mr-3 text-emerald-400" />
                Product Management
              </h2>
              <div className="px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium border border-emerald-500/30">
                {farmerProducts.length} Products Listed
              </div>
            </div>
            
            {/* Product Form Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700/10 to-slate-600/10 rounded-2xl blur-sm"></div>
              <div className="relative bg-slate-700/20 rounded-2xl p-6 border border-slate-600/30">
                <ProductForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Floating Panel */}
      <div className="fixed bottom-8 right-8 z-20">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4">
            <div className="flex flex-col space-y-3">
              <button className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">Add Product</span>
              </button>
              <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">View Orders</span>
              </button>
              <button className="flex items-center space-x-2 text-violet-400 hover:text-violet-300 transition-colors">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed top-32 left-16 w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
      <div className="fixed top-1/2 right-24 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="fixed bottom-40 left-1/4 w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
    </div>
  );
};

export default FarmerDashboard;