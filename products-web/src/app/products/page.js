'use client'

import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/products';
import LoadingComponent from '@/components/loading';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import SearchIcon from '@/icons/searchIcon';
import ProductTableComponent from '@/components/productTable';
import { ToastFail } from '@/components/toasts';
import SomethingWentWrong from '@/components/somethingWentWrong';

function Page() {
  const [data, setData] = useState(null);
  const [displayedData, setDisplayedData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchApiData = async () => {
      const result = await getAllProducts();

      if (!result.success){
        ToastFail(result.message).showToast()
        setLoading(false);
        return;
      }

      const mapped = result.message.map((x) => {
        return {
          code: x.code,
          productName: x.productName,
          brand: x.brand,
          price: x.price,
        }
      })

      setData(mapped)
      setDisplayedData(mapped);
      setLoading(false);
    };

    fetchApiData();
  }, []);

  const handleFilter = (text) => {
      const filteredData = data.filter(x =>
         x.code.toLowerCase().includes(text.toLowerCase()) || 
         x.productName.toLowerCase().includes(text.toLowerCase()) ||
         x.brand.toLowerCase().includes(text.toLowerCase()) 
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

  const handleRender = () => {
      if(loading){
        return <LoadingComponent />
      }

      if(!loading && !data){
        return <SomethingWentWrong />
      }

      return (
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
          <ProductTableComponent columns={columns} rows={displayedData} setRows={(e) => handleDelete(e)} />
        </>
      )
  }

  return handleRender();
}

export default Page;