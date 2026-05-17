import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/common/Card';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { getTeachers } from '../../services/teacherService';

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        if (data.success) {
          setTeachers(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch teachers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const headers = ['Name', 'Employee ID', 'Department', 'Type', 'Actions'];

  const renderRow = (teacher, index) => (
    <tr key={teacher._id || index} className="hover:bg-slate-50">
      <td className="p-4 font-medium text-slate-900">{teacher.name}</td>
      <td className="p-4 text-slate-600">{teacher.employeeId}</td>
      <td className="p-4 text-slate-600">{teacher.department}</td>
      <td className="p-4 text-slate-600">
        <span className="px-2 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
          {teacher.teacherType}
        </span>
      </td>
      <td className="p-4 space-x-2">
        <Button variant="outline" className="text-xs py-1 px-2">Edit</Button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Manage Teachers</h1>
        <Button variant="primary">Add Teacher</Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-slate-500">Loading teachers...</div>
          ) : (
            <Table headers={headers} data={teachers} renderRow={renderRow} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTeachers;
