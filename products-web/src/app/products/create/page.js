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
    let response = await addProduct(newProduct);
  }

  return (
      <form onSubmit={async () => await onSubmit()}  className='flex flex-col margin-y-300'>
        <Input clearable label="Code" placeholder="Product code" className='mb-3' onChange={(e) => setNewProduct({...newProduct, code: e.currentTarget.value})} />
        <Input clearable label="Name" placeholder="Product name" className='mb-3' onChange={(e) => setNewProduct({...newProduct, productName: e.currentTarget.value})}  />
        <Input clearable label="Brand" placeholder="Product brand" className='mb-3' onChange={(e) => setNewProduct({...newProduct, brand: e.currentTarget.value})}  />
        <Input clearable label="Price" type='number' placeholder="Product price"  className='mb-3' onChange={(e) => setNewProduct({...newProduct, price: e.currentTarget.value})} />
        <Button onPress={async () => await onSubmit()}>Create new product</Button>
      </form>
  )
}
