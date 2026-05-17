import React, { useContext } from 'react';
import { Card, CardContent } from '../../components/common/Card';
import { AuthContext } from '../../context/AuthContext';
import { CalendarCheck, FileText, IndianRupee } from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Welcome, {user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-emerald-100 p-3 rounded-lg mr-4">
              <CalendarCheck className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Attendance this month</p>
              <h3 className="text-2xl font-bold text-slate-900">18 Days</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-amber-100 p-3 rounded-lg mr-4">
              <FileText className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Leaves Taken</p>
              <h3 className="text-2xl font-bold text-slate-900">2</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-cyan-100 p-3 rounded-lg mr-4">
              <IndianRupee className="text-cyan-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Last Salary</p>
              <h3 className="text-xl font-bold text-slate-900">₹{user?.salary || '0'}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
