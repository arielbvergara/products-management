import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL, 
  headers:{
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY
  }
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

export async function getProductByCode(code) {
  try {
    const response = await api.get(`/api/products/${code}`);
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw new Error('Failed to fetch data from the API.');
  }
}

export async function deleteProductByCode(code) {
  try {
    const response = await api.delete(`/api/products/${code}`);
    return response.data
  } catch (error) {
    return false;
  }
}

export async function editProductByCode(product) {
  try {
    let response = await api.patch(`/api/products/${product.code}`,
    product, 
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      },
    });

    return response;

  } catch (error) {
    return false;
  }
}

export async function addProduct(product) {
  try {
    let response = await api.post(`/api/products`,
    product, 
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      },
    });

    return response;

  } catch (error) {
    return false;
  }
}

export function buildProduct(code, productName, brand, price, currency){
  return {
    code,
    productName,
    brand,
    price,
    currency
  }
}