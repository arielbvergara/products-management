'use client'

import { editProductByCode, getProductByCode } from '@/api/products';
import Container from '@/components/container';
import LoadingComponent from '@/components/loading';
import ProductForm from '@/components/productForm';
import { useEffect, useState } from 'react';

export default function Page({params}) {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const result = await getProductByCode(params.code);
        setData({
          code: {
            value: result.code,
            disabled: true
          },
          productName: {
            value: result.productName,
            disabled: false
          },
          brand:{
            value: result.brand,
            disabled: false
          },
          currency: {
            value: result.currency,
            disabled: true
          },
          price:{
            value: result.price,
            disabled: false
          }

        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchApiData();
  }, []);

  return (
    <Container>
      {
        data ? 
        (
          <ProductForm action={editProductByCode} title={`Edit product '${params.code}'`} buttonText={"Edit product"} existingProduct={data} toastMessage={"modified"} />
        ):
        (
          <LoadingComponent />
        )
      }
      
    </Container>
  )
}