"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useUserContext } from "../UserContext";
import { AddLink } from "@/components/AddLink";
import UrlContainer, { urlType } from "@/components/UrlContainer";
import axios from "axios";
// import {
//   IconProgressAlert,
//   IconRosetteDiscountCheckFilled,
// } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
// import { Drawer } from 'vaul'
// import DrawerComp from "@/components/Drawer";
import { ShareBtn } from "@/components/ShareButton";
// import { UploadImage } from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUpdate } from "@/hooks/useUpdate";

// import { ToastAction } from '@/components/ui/toast'

const Profile = () => {
  const router = useRouter();

  const { user } = useUserContext();
  const { update, changeUpdate } = useUpdate();

  // const [update, setUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [userLinks, setUserLinks] = useState<urlType[]>([]);


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!user.isLoggedin) {
      timer = setTimeout(() => {
        router.push("/signup");
      }, 1500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [user]);

  useEffect(() => {
    if (user.isLoggedin == true) {
      setLoading(true);
      axios
        .get("/api/profile", { withCredentials: true })
        .then((e) => {
          console.log(e);
          setUserLinks(e.data);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
  }, [update]);

  // const changeUpdate = useCallback(() => {
  //   setUpdate((prev) => !prev);
  // }, [update]);

  return (
    <div className="min-h-[100vh] relative">
      {!user.isLoggedin ? (
        <p className="text-2xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] tracking-widest text-center pt-10">
          You are being redirected ...
        </p>
      ) : (
        <div className="Profile h-auto px-6 w-full">

          {/* <div className="border-2 border-gray-700 rounded-lg mb-5 flex items-center justify-between p-3">
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
          {/* </div>
            <div className="">
              <AddLink
                buttonText="Edit Profile"
                delBtn={false}
                urlObj={null}
                changeUpdate={changeUpdate}
                editProfile={true}
              />
              <UploadImage user={user} setUser={setUser} />
            </div>
          </div> */}
          <div className="userLinks flex flex-col items-center w-full">
            <div className="flex w-full justify-center gap-2">
              <AddLink
                buttonText="Add New"
                delBtn={false}
                urlObj={null}
                changeUpdate={changeUpdate}
                editProfile={false}
              />
              <Button
                variant={"outline"}
                // onClick={() => router.push("/analytics")}
                className="border-white bg-white text-black"
              >
                <Link href={"profile/analytics"}>Analytics</Link>
              </Button>
              <ShareBtn
                header="Profile"
                description="Share all your social links in one place with dynamic animations and a clean interface."
                link={`${window.location.origin}/share?id=${user.id}`}
              />
            </div>
            <UrlContainer
              changeUpdate={changeUpdate}
              loading={loading}
              userLinks={userLinks}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
