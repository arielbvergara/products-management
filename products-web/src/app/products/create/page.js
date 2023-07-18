'use client'

import { addProduct } from '@/api/products';
import Container from '@/components/container';
import ToastSuccess, { ToastFail } from '@/components/toasts';
import { Button, Input, Loading } from '@nextui-org/react';
import { useState } from 'react';

export default function Page({}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    code: null,
        productName: null,
        brand: null,
        price: null,
        currency: '€'//For now this is the only currency supported
    });

  const onSubmitAsync = async () => {
    setLoading(true);
    if (!(data.code && data.productName && data.brand && data.price)) {
      ToastFail(`There are some fields that need to be completed`).showToast()
      setSubmitted(true)
      setLoading(false);
      return;
    }

    let response = await addProduct(data);
    
    if (response.success){
      ToastSuccess(`Product '${data.code}' was created successfully`).showToast();
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
    <Container>
      <form method="post" onSubmit={async () => await onSubmitAsync()}  className='flex flex-col'>
          <h4>Create product</h4>
          <Input autoFocus label="Code" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} placeholder="Product code" className={handleInputClass(data.code)} onChange={(e) => setData({...data, code: e.currentTarget.value})} />
          <Input label="Name" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} placeholder="Product name" className={handleInputClass(data.productName)} onChange={(e) => setData({...data, productName: e.currentTarget.value })} />
          <Input label="Brand" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} placeholder="Product brand" className={handleInputClass(data.brand)} onChange={(e) => setData({...data, brand: e.currentTarget.value}) }/>
          <Input label="Price" onKeyDown={async (e) => await handleKeyDownHandlerAsync(e)} type='number' placeholder="Product price"  className={handleInputClass(data.price)} onChange={(e) => setData({...data, price: e.currentTarget.value })} />
          <Button flat color="primary" auto onPress={async () => await onSubmitAsync()}>
          { 
              loading ? (<Loading type="points" color="currentColor" size="sm" />) : "Create"
          }
          </Button>
      </form>
    </Container>
  )
}