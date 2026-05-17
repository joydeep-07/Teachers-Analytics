import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "../components/common/Button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const isAuthPage = location.pathname === '/login';

  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-15 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to={user ? (user.role === 'Admin' ? '/admin' : '/teacher') : '/'} 
          className="text-xl font-bold tracking-tight text-cyan-600 flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold">
            KV
          </div>
          Teachers Portal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {!user && !isAuthPage && (
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          )}
          {user && (
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <User size={18} className="text-slate-400" />
                  <span>{user.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs text-slate-500 border border-slate-200">
                    {user.role}
                  </span>
               </div>
               <Button variant="ghost" onClick={logout} className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3">
                  <LogOut size={18} className="mr-2" />
                  Logout
               </Button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-md hover:bg-slate-50">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-3 shadow-lg">
          {!user && !isAuthPage && (
            <Link to="/login" onClick={() => setOpen(false)} className="block w-full text-center py-2 bg-cyan-600 text-white font-medium rounded-md hover:bg-cyan-700">
               Login
            </Link>
          )}
          {user && (
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-2 text-sm font-medium text-slate-700 py-2 px-1 border-b border-slate-100">
                  <User size={18} className="text-slate-400" />
                  <span className="flex-1">{user.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs text-slate-500 border border-slate-200">
                    {user.role}
                  </span>
               </div>
               <button 
                  onClick={() => { logout(); setOpen(false); }} 
                  className="flex items-center justify-center w-full py-2 text-red-600 font-medium rounded-md hover:bg-red-50 border border-red-100"
               >
                  <LogOut size={18} className="mr-2" />
                  Logout
               </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
