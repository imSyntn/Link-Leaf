"use client";

import React, { useState } from "react";
import { navItemsType } from "./NavBar";
import Link from "next/link";
import { useUserContext } from "@/app/UserContext";
import LogoutBtn from "./LogoutBtn";
import { motion, AnimatePresence } from "framer-motion";

const containerVatients = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
  transition: {
    duration: 0.3,
  },
};

const HamburgerMenu = ({ navItems }: { navItems: navItemsType[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, setUser } = useUserContext();

  return (
    <div className="block fixed top-4 right-5 z-50 sm:hidden">
      <button
        className=" relative border border-emerald-200 p-2 cursor-pointer z-[51]"
        onClick={() => setOpen((prev) => !prev)}
      >
        =
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-[-50px] right-[-100px] rounded-full w-96 h-96 bg-[#00000000] backdrop-blur-md flex flex-col items-center justify-center gap-5"
            variants={containerVatients}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="block border border-blue-200 w-fit  z-[51]"
              >
                {item.name}
              </Link>
            ))}
            {user.isLoggedin && (
              <LogoutBtn
                user={user}
                setUser={setUser}
                classNames="relative top-[0px] right-0"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
