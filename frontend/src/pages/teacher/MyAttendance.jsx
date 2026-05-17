import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { markAttendance } from '../../services/attendanceService';

const MyAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleMarkAttendance = async () => {
    setLoading(true);
    setMessage('');
    try {
      // In a real scenario, this might need more data like location
      const res = await markAttendance({ status: 'Present', date: new Date() });
      if (res.success) {
        setMessage('Attendance marked successfully for today.');
      }
    } catch (err) {
      setMessage('Failed to mark attendance. You might have already marked it.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Attendance</h1>
      
      <Card className="max-w-xl">
        <CardHeader title="Mark Daily Attendance" description="Click the button below to log your attendance for today." />
        <CardContent>
          <div className="flex flex-col items-center p-8 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
            <div className="text-4xl mb-4 text-cyan-600">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <p className="text-slate-500 mb-6">{new Date().toLocaleDateString()}</p>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleMarkAttendance} 
              disabled={loading}
              className="w-full max-w-xs h-12 text-lg"
            >
              {loading ? 'Marking...' : 'Mark Present'}
            </Button>
            {message && (
              <p className={`mt-4 text-sm font-medium ${message.includes('successfully') ? 'text-emerald-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAttendance;
