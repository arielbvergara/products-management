'use client'

import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';
import LoadingComponent from '@/components/loading';
import TableComponent from '@/components/table';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

function Page() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const result = await getAllProducts();
        setData(result.map((x) => {
          return {
            code: x.code,
            name: x.productName,
            brand: x.brand,
            price: x.price,
          }
        }))
      } catch (error) {
        console.error(error);
      }
    };

    fetchApiData();
  }, []);

  const columns = [
    {
      name: "CODE",
      uid: "code",
    },
    {
      name: "NAME",
      uid: "name",
    },
    {
      name: "BRAND",
      uid: "brand",
    },
    {
      name: "PRICE",
      uid: "price",
    },
    {
      name: "ACTIONS",
      uid: "actions",
    }
  ];

  return (
    <>
      {data ? (
        <>
        <div className='flex mb-3'>
          
        <Link href="/products/create" className='ml-auto'> 
          <Button flat color="primary" auto>
            Add new product
          </Button>
        </Link>
        </div>
        
        <TableComponent columns={columns} rows={data} />
        </>
        
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

export default Page;