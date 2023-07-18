import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers:{
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    'accept': 'application/json'
  }
});

export async function getAllProducts() {
  try {
    const response = await api.get(`/api/products`);
    return buildSuccessResponse(response.data);
  } catch (exception) {
    return buildErrorResponse(exception);
  }
}

export async function getProductByCode(code) {
  try {
    const response = await api.get(`/api/products/${code}`);
    return buildSuccessResponse(response.data);
  } catch (exception) {
    return buildErrorResponse(exception);
  }
}

export async function deleteProductByCode(code) {
  try {
    const response = await api.delete(`/api/products/${code}`);
    return buildSuccessResponse(response.data);
  } catch (exception) {
    return buildErrorResponse(exception);
  }
}

export async function editProductByCode(product) {
  try {
    let response = await api.patch(`/api/products/${product.code}`,
    product, 
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return buildSuccessResponse(response.data);

  } catch (exception) {
    return buildErrorResponse(exception);
  }
}

export async function addProduct(product) {
  try {
    let response = await api.post(`/api/products`,
    product, 
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return buildSuccessResponse(response.data);

  } catch (exception) {
    return buildErrorResponse(exception);
  }
}

const buildSuccessResponse = (res) => {
  return {
    success: true,
    message: res
  }
}

const buildErrorResponse = (exception) => {
  return {
    success: false,
    message: exception.response.data.error
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