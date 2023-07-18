'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { CssBaseline } from '@nextui-org/react'
import { NextUIProvider } from '@nextui-org/react'

export default function Providers({ children }) {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>
  })

  return (
    <>
        <NextUIProvider>
          {children}
        </NextUIProvider>
    </>
  )
}