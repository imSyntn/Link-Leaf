"use client";
import React, { useEffect } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { usePathname } from "next/navigation";

export function Navbar() {

  const pathname = usePathname()

  // useEffect(()=> {
  //   console.log(pathname)
  // },[pathname])

  const navItems = [
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
    }
  ];

  return (
    // <div className="relative  w-full">
      // {
        (pathname !== '/share') && (
          <FloatingNav navItems={navItems} pathname={pathname} className="min-h-[55.2px]" />
        )
      // }
    // </div>
  );
}
