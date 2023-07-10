'use client'

import { useEffect, useState } from 'react';
import { getProductByCode } from '../../../../api/products';
import Loading from '@/components/loading';

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

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <Loading />
      )}
  </div>
  )
}
