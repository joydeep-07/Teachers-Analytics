import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Users, CalendarCheck, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl">
          Digital <span className="text-cyan-600">Attendance Register</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
          A secure, comprehensive platform for managing teacher attendance, leaves, and salary with precision and ease.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/login">
            <Button variant="primary" className="px-8 py-3 text-lg">Get Started</Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center mb-4">
              <CalendarCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Real-time Attendance</h3>
            <p className="text-slate-600">Track daily arrivals and departures with accurate, real-time logging.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Leave Management</h3>
            <p className="text-slate-600">Seamlessly apply for, review, and approve leave requests digitally.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Secure & Reliable</h3>
            <p className="text-slate-600">Built with enterprise-grade security to ensure your data is always safe.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
