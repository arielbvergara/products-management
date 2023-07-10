import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL, 
});

export async function getAllProducts() {
  try {
    const response = await api.get(`/api/products`);
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw new Error('Failed to fetch data from the API.');
  }
}
