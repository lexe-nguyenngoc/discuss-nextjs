import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import React, { Suspense } from "react";

import paths from "@/paths";

import HeaderAuth from "./HeaderAuth";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={paths.home()} className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
