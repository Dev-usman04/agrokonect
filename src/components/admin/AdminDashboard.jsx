import React from 'react';
import { User, ShoppingCart, DollarSign, Truck, Phone, CheckCircle, Mail } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import StatsCard from '../shared/StatsCard';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  const { activeTab, orders } = useAppContext();

  const stats = [
    { title: 'Total Users', value: '248', icon: User, color: 'text-cyan-400' },
    { title: 'Active Orders', value: orders.length, icon: ShoppingCart, color: 'text-emerald-400' },
    { title: 'Total Revenue', value: '₦2.5M', icon: DollarSign, color: 'text-violet-400' },
    { title: 'Deliveries', value: '156', icon: Truck, color: 'text-amber-400' }
  ];

  const quickActions = [
    { label: 'Contact Delivery Team', icon: Phone, gradient: 'from-cyan-500 to-blue-600' },
    { label: 'Approve Payments', icon: CheckCircle, gradient: 'from-emerald-500 to-teal-600' },
    { label: 'Schedule Deliveries', icon: Truck, gradient: 'from-violet-500 to-purple-600' },
    { label: 'Send Notifications', icon: Mail, gradient: 'from-amber-500 to-orange-600' }
  ];

  if (activeTab === 'orders') {
    return <OrderManagement />;
  }

  if (activeTab === 'users') {
    return <UserManagement />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-400 text-lg">Monitor your platform performance and manage operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${
                  index === 0 ? 'from-cyan-500/20 to-blue-500/20' :
                  index === 1 ? 'from-emerald-500/20 to-teal-500/20' :
                  index === 2 ? 'from-violet-500/20 to-purple-500/20' :
                  'from-amber-500/20 to-orange-500/20'
                }`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm font-medium">{stat.title}</div>
                </div>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${
                  index === 0 ? 'from-cyan-500 to-blue-500' :
                  index === 1 ? 'from-emerald-500 to-teal-500' :
                  index === 2 ? 'from-violet-500 to-purple-500' :
                  'from-amber-500 to-orange-500'
                } transition-all duration-1000 ease-out`} 
                style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="xl:col-span-2 group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-slate-600/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3 text-emerald-400" />
                Recent Orders
              </h3>
              <div className="px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
                {orders.length} Active
              </div>
            </div>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order, index) => (
                <div key={order.id} className="group/item relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 via-slate-700/20 to-slate-700/0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-semibold text-white text-lg">{order.product.name}</p>
                        <p className="text-slate-400 flex items-center">
                          <span className="text-cyan-400">{order.buyer}</span>
                          <span className="mx-2">→</span>
                          <span className="text-emerald-400">{order.product.farmer}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'pending' 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-amber-500/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:border-slate-600/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-violet-400" />
              Quick Actions
            </h3>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`group/btn w-full relative overflow-hidden rounded-xl p-4 bg-gradient-to-r ${action.gradient} hover:shadow-lg hover:shadow-slate-900/50 transform hover:scale-105 transition-all duration-200 active:scale-95`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative flex items-center justify-center text-white font-semibold">
                    <action.icon className="w-5 h-5 mr-3" />
                    {action.label}
                  </div>
                  <div className="absolute inset-0 border border-white/20 rounded-xl"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
      <div className="fixed bottom-32 left-10 w-3 h-3 bg-violet-400 rounded-full animate-bounce"></div>
      <div className="fixed top-1/2 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
    </div>
  );
};

export default AdminDashboard;