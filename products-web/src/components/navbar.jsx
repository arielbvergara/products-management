'use client'

import React from "react";
import { Navbar, Text } from "@nextui-org/react";
import Link from "next/link";

export default function App() {
  return (
  <Navbar variant="sticky">
    <Navbar.Brand>
      <Text b color="inherit" >
        <Link href="/" className="text-slate-600">Dustin assesment</Link>
      </Text>
    </Navbar.Brand>
    <Navbar.Content variant="highlight-rounded">
      <Navbar.Link href="/products">
        Products
      </Navbar.Link>
      <Navbar.Link href="/users">Users</Navbar.Link>
    </Navbar.Content>
  </Navbar>   
  )
}
