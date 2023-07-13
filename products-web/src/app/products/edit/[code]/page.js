'use client'

import { editProductByCode, getProductByCode } from '@/api/products';
import Container from '@/components/container';
import LoadingComponent from '@/components/loading';
import NoData from '@/components/noData';
import ProductForm from '@/components/productForm';
import { ToastFail } from '@/components/toasts';
import { useEffect, useState } from 'react';

export default function Page({params}) {
  
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      const result = await getProductByCode(params.code);

      if (!result.success){
        ToastFail(result.message).showToast()
        setLoading(false);
        return;
      }

      setData({
        code: {
          value: result.message.code,
          disabled: true
        },
        productName: {
          value: result.message.productName,
          disabled: false
        },
        brand:{
          value: result.message.brand,
          disabled: false
        },
        currency: {
          value: result.message.currency,
          disabled: true
        },
        price:{
          value: result.message.price,
          disabled: false
        }
      });
      setLoading(false);
    };

    fetchApiData();
  }, []);

  return (
    <>
      {
        loading ? 
        (
          <LoadingComponent />
        ):
        (
          data ? 
          (
            <Container>
              <ProductForm action={editProductByCode} title={`Edit product '${params.code}'`} buttonText={"Edit product"} existingProduct={data} successToastMessage={"Product modified successfully"} />
            </Container>
          ):
          (
            <NoData />
          )
        )
      }
    </>
    
  )
}