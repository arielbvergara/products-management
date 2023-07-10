'use client'

import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';

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
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;