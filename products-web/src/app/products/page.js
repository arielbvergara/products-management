'use client'

import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';
import Loading from '@/components/loading';
import TableComponent from '@/components/table';

function Page() {
  const [data, setData] = useState(null);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const result = await getAllProducts();
        setData(result);
        setRows(result.map((x) => {
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
    <div>
      {data ? (
        <TableComponent columns={columns} rows={rows} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Page;