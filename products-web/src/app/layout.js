'use client'

import Navbar from '@/components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { NextUIProvider, CssBaseline } from '@nextui-org/react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {CssBaseline.flush()}
      </head>
      <body className={inter.className}>
        <NextUIProvider>
          <Navbar />
          <div className="container mx-auto mt-10">
            {children}
          </div>
        </NextUIProvider>
      </body>
    </html>
  )
}
