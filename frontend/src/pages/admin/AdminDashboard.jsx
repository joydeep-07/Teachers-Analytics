import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Users, CalendarCheck, FileText } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-cyan-100 p-3 rounded-lg mr-4">
              <Users className="text-cyan-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Teachers</p>
              <h3 className="text-2xl font-bold text-slate-900">42</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-emerald-100 p-3 rounded-lg mr-4">
              <CalendarCheck className="text-emerald-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Present Today</p>
              <h3 className="text-2xl font-bold text-slate-900">38</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-amber-100 p-3 rounded-lg mr-4">
              <FileText className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Leaves</p>
              <h3 className="text-2xl font-bold text-slate-900">5</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
