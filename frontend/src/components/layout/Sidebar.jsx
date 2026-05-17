import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, FileText, IndianRupee } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { cn } from '../common/Button';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Teachers', path: '/admin/teachers', icon: Users },
    { name: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
    { name: 'Leaves', path: '/admin/leaves', icon: FileText },
    { name: 'Salary', path: '/admin/salary', icon: IndianRupee },
  ];

  const teacherLinks = [
    { name: 'Dashboard', path: '/teacher', icon: LayoutDashboard },
    { name: 'My Attendance', path: '/teacher/attendance', icon: CalendarCheck },
    { name: 'My Leaves', path: '/teacher/leaves', icon: FileText },
    { name: 'My Salary', path: '/teacher/salary', icon: IndianRupee },
  ];

  const links = user?.role === 'Admin' ? adminLinks : teacherLinks;

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] sticky top-16 hidden md:block shrink-0">
      <div className="p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin' || link.path === '/teacher'}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-cyan-50 text-cyan-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )
              }
            >
              <Icon size={20} />
              {link.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
