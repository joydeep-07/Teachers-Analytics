import api from './api';

export const applyLeave = async (leaveData) => {
  const response = await api.post('/leaves', leaveData);
  return response.data;
};

export const getMyLeaves = async () => {
  const response = await api.get('/leaves/me');
  return response.data;
};

export const getAllLeaves = async () => {
  const response = await api.get('/leaves');
  return response.data;
};

export const updateLeaveStatus = async (id, statusData) => {
  const response = await api.put(`/leaves/${id}`, statusData);
  return response.data;
};
