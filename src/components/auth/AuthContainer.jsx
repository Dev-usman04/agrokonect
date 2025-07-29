import React, { useState } from 'react';
import { Sprout, Users, Shield, ChevronDown } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('farmer');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userTypes = [
    { value: 'farmer', label: 'Farmer', icon: Sprout, color: 'from-emerald-500 to-green-600' },
    { value: 'buyer', label: 'Buyer', icon: Users, color: 'from-blue-500 to-cyan-600' },
    { value: 'admin', label: 'Admin', icon: Shield, color: 'from-violet-500 to-purple-600' }
  ];

  const selectedUserType = userTypes.find(type => type.value === userType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-20 w-1 h-1 bg-amber-400 rounded-full animate-bounce delay-300"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl shadow-emerald-500/25">
            <Sprout className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent mb-4">
            AgriConnect
          </h1>
          <p className="text-xl text-slate-300 font-medium">
            Connecting Farmers, Buyers & Delivering Fresh Produce
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
          </div>
        </div>

        {/* Auth Card */}
        <div className="max-w-lg mx-auto relative group">
          {/* Card Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          
          <div className="relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            {/* Tab Navigation */}
            <div className="relative mb-8">
              <div className="flex bg-slate-700/50 rounded-2xl p-2 backdrop-blur-sm border border-slate-600/30">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                    activeTab === 'login'
                      ? 'text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {activeTab === 'login' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl"></div>
                  )}
                  <span className="relative z-10">Login</span>
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                    activeTab === 'register'
                      ? 'text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {activeTab === 'register' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl"></div>
                  )}
                  <span className="relative z-10">Register</span>
                </button>
              </div>
            </div>

            {/* User Type Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Select User Type
              </label>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between p-4 bg-slate-700/40 border border-slate-600/50 rounded-xl text-white hover:border-slate-500/70 transition-all duration-200 group/btn"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedUserType.color}`}>
                      <selectedUserType.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{selectedUserType.label}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-xl overflow-hidden shadow-2xl z-20">
                    {userTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => {
                          setUserType(type.value);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 p-4 hover:bg-slate-700/50 transition-all duration-200 ${
                          userType === type.value ? 'bg-slate-700/30' : ''
                        }`}
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${type.color}`}>
                          <type.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-medium">{type.label}</span>
                        {userType === type.value && (
                          <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700/10 to-slate-600/10 rounded-2xl blur-sm"></div>
              <div className="relative">
                {activeTab === 'login' ? (
                  <LoginForm userType={userType} />
                ) : (
                  <RegisterForm userType={userType} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm">
            © 2025 AgriConnect. Revolutionizing agriculture through technology.
          </p>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setDropdownOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AuthContainer;