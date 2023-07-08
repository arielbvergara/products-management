import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='flex justify-between place-items-center h-12'>
        <Link href='/'>Home</Link>
        
        <div className='w-3/12 flex justify-around'>
            <Link href="/products">Products</Link>
            <Link href='/users'>Users</Link>
        </div>
    </div>
  )
}
