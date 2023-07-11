'use client'

import React from "react";
import { Navbar, Text } from "@nextui-org/react";

export default function App() {
  return (
  <Navbar variant="sticky">
    <Navbar.Brand>
      <Text b color="inherit" hideIn="xs">
        Dustin assesment
      </Text>
    </Navbar.Brand>
    <Navbar.Content hideIn="xs" variant="highlight-rounded">
      <Navbar.Link href="/products">
        Products
      </Navbar.Link>
      <Navbar.Link href="/users">Users</Navbar.Link>
    </Navbar.Content>
  </Navbar>   
  )
}
