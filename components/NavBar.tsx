"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { usePathname } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";

export interface navItemsType {
  name: string,
  link: string
}

const navItems:navItemsType[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

export function Navbar() {
  const pathname = usePathname();

  // useEffect(()=> {
  //   console.log(pathname)
  // },[pathname])

  return (
    // <div className="relative  w-full">
    // {
    pathname !== "/share" && (
      <>
        <FloatingNav
          navItems={navItems}
          pathname={pathname}
          className="min-h-[55.2px] hidden sm:flex"
        />
        <HamburgerMenu navItems={navItems} />
      </>
    )
    // }
    // </div>
  );
}
