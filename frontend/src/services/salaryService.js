import api from './api';

export const generateSalary = async (salaryData) => {
  const response = await api.post('/salary/generate', salaryData);
  return response.data;
};

export const getMySalary = async () => {
  const response = await api.get('/salary/me');
  return response.data;
};

export const getAllSalaries = async () => {
  const response = await api.get('/salary');
  return response.data;
};
