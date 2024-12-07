"use client";

import React from "react";
import { AddLink } from "@/components/AddLink";
import DrawerComp from "@/components/Drawer";
import { UploadImage } from "@/components/ImageUpload";
import {
  IconProgressAlert,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";
import { useUserContext } from "../UserContext";
import LogoutBtn from "@/components/LogoutBtn";
// import '@/app/globals.css'
// import { useUpdate } from "@/hooks/useUpdate";

export interface contextUpdateType {
  name: string;
  isVarified: boolean;
  profilePic: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, setUser } = useUserContext();
  //   const { update, changeUpdate } = useUpdate();

  const changeUpdate: (obj?: contextUpdateType) => void = (obj) => {
    if (obj) {
      setUser((prev) => ({
        ...prev,
        name: obj.name,
        isVarified: obj.isVarified,
        profilePic: obj.profilePic,
      }));
    }
  };

  return (
    <>
      {user.isLoggedin && (
        <>
          <div className="border-2 border-gray-700 rounded-lg mb-5 flex items-center flex-wrap gap-2 justify-between p-3 mx-6 mt-24">
            <div className=" flex items-center">
              <img
                src={user.profilePic}
                alt="profile pic"
                className="w-16 h-16 rounded-full"
              />

              <div className="text flex flex-col items-center">
                <p className="ml-3 flex items-center text-white text-[1.1rem]">
                  {user.name}{" "}
                  {user.isVarified ? (
                    <IconRosetteDiscountCheckFilled className="text-blue-500 ml-1" />
                  ) : (
                    <IconProgressAlert className="text-red-400 ml-1" />
                  )}
                </p>
                {!user.isVarified && <DrawerComp />}
              </div>

              {/* </p> */}
            </div>
            <div className="flex justify-end gap-2 nameBtns">
              <AddLink
                buttonText="Edit Profile"
                delBtn={false}
                urlObj={null}
                changeUpdate={changeUpdate}
                editProfile={true}
              />
              <UploadImage user={user} setUser={setUser} />
            </div>
          </div>
          <LogoutBtn user={user} setUser={setUser} classNames='hidden sm:block' />
        </>
      )}
      {children}
    </>
  );
}
