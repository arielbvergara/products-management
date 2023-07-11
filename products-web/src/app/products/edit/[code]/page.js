'use client'

import { useEffect, useState } from 'react';
import { getProductByCode } from '../../../../api/products';
import LoadingComponent from '@/components/loading';

export default function Page({ params }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const result = await getProductByCode(params.code);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApiData();
  }, []);

  const handleEditProduct = async (code) => {
    if (confirm('Are you sure you want to delete this product?')) {
      let response = await deleteProductByCode(code);
      alert(response)
    } else {
      console.log('Thing was not saved to the database.');
    }
  }

  return (
    <div>
      {data ? (
        <>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button onClick={async () => await handleEditProduct(params.code) }>Edit</button>
        </>
        
      ) : (
        <LoadingComponent />
      )}
  </div>
  )
}
