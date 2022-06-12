import * as React from "react"
import { Img, Link, Navbar } from "rendition"

export const NavBar: React.FC = () => {
  return (
    <Navbar
      brand={
        <Link color="white" href="/">
          <Img src="logo.png" style={{ height: "20px" }} />
        </Link>
      }
      color="white"
    >
      <Link color="white" href="/docs/">
        Users
      </Link>
    </Navbar>
  )
}
