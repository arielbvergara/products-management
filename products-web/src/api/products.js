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
  } catch (error) {
    // Handle error appropriately
    throw new Error('Failed to fetch data from the API.');
  }
}

export async function editProductByCode(code, product) {
  try {
    //TODO: add body to the api call
    const response = await api.patch(`/api/products/${code}`);
  } catch (error) {
    // Handle error appropriately
    throw new Error('Failed to fetch data from the API.');
  }
}

export async function addProduct(product) {
  try {
    let response = await api.post(`/api/products`,
    product
    , {
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