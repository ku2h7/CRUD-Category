import axios from 'axios';

const API_BASE_URL = 'https://mock-api.arikmpt.com/api';

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/user/register`, data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/user/login`, data);
  return response.data;
};