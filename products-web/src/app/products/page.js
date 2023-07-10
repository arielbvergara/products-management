'use client'

import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';
import Loading from '@/components/loading';

function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const result = await getAllProducts();
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
  );
}

export default Page;