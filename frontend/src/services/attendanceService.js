import api from './api';

export const markAttendance = async (attendanceData) => {
  const response = await api.post('/attendance', attendanceData);
  return response.data;
};

export const getMyAttendance = async () => {
  const response = await api.get('/attendance/me');
  return response.data;
};

export const getAllAttendance = async () => {
  const response = await api.get('/attendance');
  return response.data;
};
