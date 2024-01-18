import axios from 'axios';

const API_BASE_URL = 'https://mock-api.arikmpt.com/api';

export const createCategory = async (name: string, token: string) => {
  const response = await axios.post(`${API_BASE_URL}/category/create`, { name }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateCategory = async (id: string, name: string, is_active: boolean, token: string) => {
  const response = await axios.put(`${API_BASE_URL}/category/update`, { id, name, is_active }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const getCategories = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/category`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const deleteCategory = async (categoryId: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/category/${categoryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};