'use client'

import { addProduct } from '@/api/products';
import { Input, Button  } from '@nextui-org/react';
import { useState } from 'react';


export default function page() {

  const [newProduct, setNewProduct] = useState({
    code: null,
    productName: null,
    brand: null,
    price: null,
    currency: '€' //For now this is the only currency supported
  })

  const onSubmit = async () => {
    await addProduct(newProduct);
  }

  return (
      <form onSubmit={async () => await onSubmit()}  className='flex flex-col'>
        <Input label="Code" placeholder="Product code" className='mb-3' onChange={(e) => setNewProduct({...newProduct, code: e.currentTarget.value})} />
        <Input label="Name" placeholder="Product name" className='mb-3' onChange={(e) => setNewProduct({...newProduct, productName: e.currentTarget.value})}  />
        <Input label="Brand" placeholder="Product brand" className='mb-3' onChange={(e) => setNewProduct({...newProduct, brand: e.currentTarget.value})}  />
        <Input label="Price" placeholder="Product price"  className='mb-3' onChange={(e) => setNewProduct({...newProduct, price: e.currentTarget.value})} />
        <Button onPress={async () => await onSubmit()}>Create new product</Button>
      </form>
  )
}
