'use client'

import { editProductByCode, getProductByCode } from '@/api/products';
import Container from '@/components/container';
import LoadingComponent from '@/components/loading';
import ToastSuccess, { ToastFail } from '@/components/toasts';
import { Button, Input, Loading, StyledContainer } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function Page({params}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      const result = await getProductByCode(params.code);
      if (!result.success){
        ToastFail(result.message).showToast()
        return;
      }

      setData(result.message);
    };

    fetchApiData();
  }, []);

  const onSubmitAsync = async () => {
    setLoading(true);
    if (!(data.code && data.productName && data.brand && data.price)) {
      ToastFail(`There are some fields that need to be completed`).showToast()
      setSubmitted(true)
      setLoading(false);
      return;
    }

    let response = await editProductByCode(data);
    
    if (response.success){
      ToastSuccess(`Product '${data.code}' edited successfully`).showToast();
    }
    else{
      ToastFail(response.message).showToast()
    }

    setLoading(false);
  }

  const handleInputClass = (propertyValue) => {
      return submitted && !propertyValue ? 'border-2 border-rose-600 mb-3': 'mb-3';
  }

  const handleKeyDownHandlerAsync = async (event) => {
      if (event.key === 'Enter') {
          await onSubmitAsync();
      }
  }

  return (
    data ? 
    (
      <Container>
        <form method="post" onSubmit={async () => await onSubmitAsync()}  className='flex flex-col'>
            <h4>Edit product '{data.code}'</h4>
            <Input label="Code" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} placeholder="Product code" className={handleInputClass(data.code)} onChange={(e) => setData({...data, code: e.currentTarget.value})} value={data.code} disabled />
            <Input label="Name" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} placeholder="Product name" className={handleInputClass(data.productName)} onChange={(e) => setData({...data, productName: e.currentTarget.value })}  value={data.productName} />
            <Input label="Brand" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} placeholder="Product brand" className={handleInputClass(data.brand)} onChange={(e) => setData({...data, brand: e.currentTarget.value})} value={data.brand}/>
            <Input label="Price" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} type='number' placeholder="Product price"  className={handleInputClass(data.price)} onChange={(e) => setData({...data, price: e.currentTarget.value })} value={data.price} />
            <Button flat color="primary" auto onPress={async () => await onSubmitAsync()}>
            { 
                loading ? (<Loading type="points" color="currentColor" size="sm" />) : "Edit"
            }
            </Button>
        </form>
      </Container>
    ):(
      <LoadingComponent />
    )
  )
}