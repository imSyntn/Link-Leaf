"use client";
import React, { useState, useEffect } from "react";
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
import Preview from "@/components/Preview";
import { AnimatePresence } from "framer-motion";

// import { ToastAction } from '@/components/ui/toast'

const Profile = () => {
  const router = useRouter();

  const { user } = useUserContext();
  const { update, changeUpdate } = useUpdate();

  // const [update, setUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [userLinks, setUserLinks] = useState<urlType[]>([]);
  const [showPreview, setShowPreview] = useState(false);

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
          const data = e.data.sort((a:urlType,b:urlType)=> a.sortOrder - b.sortOrder)
          setUserLinks(data);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
  }, [update]);

  return (
    <div className="min-h-[100vh] relative">
      {!user.isLoggedin ? (
        <p className="text-2xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] tracking-widest text-center pt-10">
          You are being redirected ...
        </p>
      ) : (
        <>
          <div className="Profile h-auto px-6 w-full">
            <div className="userLinks flex flex-col items-center w-full">
              <div className="flex flex-wrap w-full justify-center gap-2">
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
                <Button
                  variant={"outline"}
                  className="border-white bg-white text-black"
                  onClick={() => setShowPreview(true)}
                >
                  Preview
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
                setUserLinks={setUserLinks}
              />
            </div>
          </div>
          <AnimatePresence>
            {showPreview && <Preview setShowPreview={setShowPreview} userLinks={userLinks} />}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Profile;
