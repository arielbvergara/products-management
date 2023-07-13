'use client'

import { addProduct } from '@/api/products';
import Container from '@/components/container';
import ProductForm from '@/components/productForm';

export default function Page() {
  return (
    <Container>
      <ProductForm action={addProduct} title={"Create new product"} buttonText={"Add new product"} successToastMessage={`Product created successfully`} />
    </Container>
  )
}
