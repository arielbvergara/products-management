'use client'

import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';
import LoadingComponent from '@/components/loading';
import TableComponent from '@/components/table';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import SearchIcon from '@/icons/searchIcon';


function Page() {
  const [data, setData] = useState(null);
  const [displayedData, setDisplayedData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const result = await getAllProducts();
        const mapped = result.map((x) => {
          return {
            code: x.code,
            productName: x.productName,
            brand: x.brand,
            price: x.price,
          }
        })

        setData(mapped)
        setDisplayedData(mapped);
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchApiData();
  }, [data]);

  const handleFilter = (text) => {
      const filteredData = data.filter(x =>
         x.code.includes(text) || 
         x.productName.includes(text) ||
         x.brand.includes(text) 
      );
      
      setDisplayedData(filteredData);
  }

  const handleDelete = (code) => {
    const filtered = data.filter(x => x.code != code)
    setData(filtered); 
    setDisplayedData(filtered)
  }

  const columns = [
    {
      name: "CODE",
      uid: "code",
    },
    {
      name: "NAME",
      uid: "productName",
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
      {!loading ? (
        <>
          <div className='flex mb-3'>
            <Input  
            aria-label="search product"
            fullWidth='true' 
            type='search' 
            placeholder="Search product"  
            className='mr-3' 
            contentRight={
                <SearchIcon />
            }
            onChange={(e) => handleFilter(e.currentTarget.value)} />

            <Link href="/products/create" className='ml-5'> 
              <Button flat color="primary" auto>
                Add product
              </Button>
            </Link>
          </div>
          
          {
            <TableComponent columns={columns} rows={displayedData} setRows={(e) => handleDelete(e)} />
          }
        </>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

export default Page;