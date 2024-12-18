"use client";

import React, { useState } from "react";
import { navItemsType } from "./NavBar";
import Link from "next/link";
import { useUserContext } from "@/app/UserContext";
import LogoutBtn from "./LogoutBtn";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

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
      duration: 0.1,
    }
};

const HamburgerMenu = ({ navItems }: { navItems: navItemsType[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, setUser } = useUserContext();
  const pathname = usePathname();

  return (
    <div className="block fixed top-4 right-5 z-50 sm:hidden">
      <button
        className=" relative p-2 cursor-pointer z-[51]"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <IconX className="" /> : <IconMenu2 className="" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-[-20px] right-[-20px] w-96 h-96 rounded-2xl bg-[#00000077] backdrop-blur-lg flex flex-col items-center justify-center gap-5"
            variants={containerVatients}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className={`block relative w-fit text-md font-bold tracking-wider z-[51] blend-difference ${
                  item.link == pathname
                    ? "border border-neutral-200 dark:border-white  px-4 py-2 rounded-full"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user.isLoggedin && (
              <LogoutBtn
                user={user}
                setUser={setUser}
                classNames="relative top-[0px] right-[0px]"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
