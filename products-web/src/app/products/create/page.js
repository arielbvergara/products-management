'use client'

import { addProduct } from '@/api/products';
import Container from '@/components/container';
import ToastSuccess, { ToastFail } from '@/components/toasts';
import { Input, Button, Loading  } from '@nextui-org/react';
import { useEffect, useState } from 'react';


export default function Page() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newProduct, setNewProduct] = useState({
    code: null,
    productName: null,
    brand: null,
    price: null,
    currency: '€' //For now this is the only currency supported
  })

  useEffect(() => {

  }, [submitted])
  

  const onSubmit = async () => {
    setLoading(true);
    if (!(newProduct.code && newProduct.productName && newProduct.brand && newProduct.price)) {
      ToastFail(`There are some fields that need to be completed`).showToast()
      setSubmitted(true)
      setLoading(false);
      return;
    }

    let response = await addProduct(newProduct);

    if (response){
      ToastSuccess(`Product '${newProduct.productName}' was created successfully`).showToast();
    }
    else{
      ToastFail(`Product '${newProduct.productName}' was not created.`).showToast()
    }

    setLoading(false);
  }

  const handleInputClass = (propertyValue) => {
    console.log(propertyValue, submitted)
    return submitted && !propertyValue ? 'border-2 border-rose-600 mb-3': 'mb-3';
  }

  return (
    <Container>
      <form onSubmit={async () => await onSubmit()}  className='flex flex-col'>
        <Input label="Code" placeholder="Product code" className={handleInputClass(newProduct.code)} onChange={(e) => setNewProduct({...newProduct, code: e.currentTarget.value})} />
        <Input label="Name" placeholder="Product name" className={handleInputClass(newProduct.productName)} onChange={(e) => setNewProduct({...newProduct, productName: e.currentTarget.value})}  />
        <Input label="Brand" placeholder="Product brand" className={handleInputClass(newProduct.brand)} onChange={(e) => setNewProduct({...newProduct, brand: e.currentTarget.value})}  />
        <Input label="Price" type='number' placeholder="Product price"  className={handleInputClass(newProduct.price)} onChange={(e) => setNewProduct({...newProduct, price: e.currentTarget.value})} />
        <Button flat color="primary" auto onPress={async () => await onSubmit()}>
          { 
            loading ? (<Loading  type="points" color="currentColor" size="sm" />) : ("Create new product")
          }
        </Button>
      </form>
    </Container>
  )
}
