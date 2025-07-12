import axios from 'axios';

const API_BASE = '/api';

export const analyzeData = async (query: string, data: any[]) => {
  const response = await axios.post(`${API_BASE}/analyze`, {
    query,
    data
  });
  return response.data;
};