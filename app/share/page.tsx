"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import "@/app/share/sharePage.css";
import { useToast } from "@/hooks/use-toast";
import { dropdownValue } from "@/lib/DropdownValue";
import {
  FaXTwitter as Twitter,
  FaInstagram as Instagram,
} from "react-icons/fa6";
import { FiYoutube as Youtube } from "react-icons/fi";
import { BsTiktok as Tiktok } from "react-icons/bs";
import { BiLogoLinkedin as Linkedin } from "react-icons/bi";
import { AiOutlineSpotify as Spotify } from "react-icons/ai";
import { motion } from "framer-motion";
import { ShareBtn } from "@/components/ShareButton";
import Svg from "./Svg";
import { LoaderWrapper } from "@/components/Loader";
import Link from "next/link";

interface linkType {
  id: number;
  siteName: string;
  siteURL: string;
  description: string;
  userId: number;
}

interface dataType {
  email: string;
  isVarified: boolean;
  name: string;
  links: linkType[];
  profilePic: string;
  description: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Controls the delay between each child's animation
    },
  },
};
const itemVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10,
    },
  },
};

const divItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10,
    },
  },
};

const iconSelect = (name: string) => {
  if (name == "twitter") {
    return Twitter;
  } else if (name == "youtube") {
    return Youtube;
  } else if (name == "instagram") {
    return Instagram;
  } else if (name == "tiktok") {
    return Tiktok;
  } else if (name == "linkedin") {
    return Linkedin;
  } else if (name == "spotify") {
    return Spotify;
  } else return null;
};

const SharePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<dataType>();

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/share?id=${id}`)
        .then((e) => {
          if (e.data.status >= 400) {
            toast({
              title: "Error.",
              description: e.data.msg,
            });
          } else {
            setData(e.data.userData[0]);
            axios
              .post(`/api/share/visitors?id=${id}`)
              .then((e) => console.log(e.data))
              .catch((e) => console.log(e));
          }
        })
        .catch(() =>
          toast({
            title: "Error",
            description: "Error Occured",
          })
        )
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {loading && <LoaderWrapper />}
      <div className="min-h-[100vh] overflow-y-auto overflow-x-hidden">
        {id ? (
          <>
            <div className="relative flex justify-center items-end">
              <Svg TailwindClass="h-[100%] absolute left-[50%] bottom-0 translate-x-[-50%]" />
              {/* <img src="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/svg.png" className='h-[100%] w-[100vw]  absolute left-[50%] bottom-0 translate-x-[-50%]' alt="" /> */}
              <motion.img
                src={data?.profilePic}
                alt=" "
                className="mt-12 w-44 h-44 rounded-full z-10 sm:w-48 sm:h-48"
                initial={{
                  opacity: 0,
                  y: "35px",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
              />
            </div>
            {data && !loading && (
              <>
                <div className="details flex flex-col justify-between items-center px-5 sm:px-10">
                  <h1 className="text-3xl my-3">{data.name}</h1>
                  <p className="text-center">{data.description}</p>
                </div>
                {data.links.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="w-full flex justify-center my-5">
                      {data.links.map((item: linkType) => {
                        if (
                          dropdownValue
                            .slice(0, dropdownValue.length - 1)
                            .find((dropData) => {
                              return (
                                dropData.value.toLowerCase() ==
                                item.siteName.toLowerCase()
                              );
                            })
                        ) {
                          const Icon = iconSelect(
                            item.siteName.toLowerCase()
                          ) as React.ElementType;
                          return (
                            <motion.a
                              key={item.id}
                              href={item.siteURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 flex justify-center items-center rounded-full mx-1 shadow-md bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] hover:shadow-[inset_0px_0px_50px_1px_#81e6d9]"
                              variants={itemVariants}
                              whileHover={{ scale: 1.2 }}
                            >
                              {<Icon className="text-black text-2xl" />}
                            </motion.a>
                          );
                        }
                      })}
                    </div>
                    <div className="flex flex-col px-5 sm:px-10">
                      {data.links.map((item: linkType) => {
                        if (
                          !dropdownValue
                            .slice(0, dropdownValue.length - 1)
                            .find((dropData) => {
                              return (
                                dropData.value.toLowerCase() ==
                                item.siteName.toLowerCase()
                              );
                            })
                        ) {
                          return (
                            <motion.div
                              key={item.id}
                              className="linkCard relative flex items-center justify-between my-1 border border-gray-500 rounded-lg p-3 cursor-pointer hover:text-black"
                              variants={divItemVariants}
                              // whileHover={{
                              //   backgroundColor: 'white'
                              // }}
                            >
                              <a
                                href={item.siteURL}
                                target="_blank"
                                className=" w-[100%] flex items-center justify-between"
                              >
                                <img
                                  src={`https://www.google.com/s2/favicons?domain=${item.siteURL}&sz=128`}
                                  alt={item.siteName}
                                  className="w-10 h-10 rounded-sm"
                                />
                                <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                  {item.description}
                                </p>
                              </a>
                              <div className="w-[70px] mr-2">
                                <ShareBtn
                                  header={item.siteName}
                                  description={`Share your ${item.siteName} link.`}
                                  link={item.siteURL}
                                />
                              </div>
                            </motion.div>
                          );
                        }
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <div className="border border-gray-500 flex justify-center items-center py-5 mx-3 mt-5 rounded-lg">
                    <p className="text-2xl tracking-wider">
                      No links shared😓.
                    </p>
                  </div>
                )}
                <div className="w-full flex justify-center mt-9">
                  <Link href={'/signup'} className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-md font-semibold leading-6  text-white inline-block">
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-6 ring-1 ring-white/10 ">
                      <span>Join</span>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                  </Link>
                </div>
              </>
            )}
          </>
        ) : (
          <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-nowrap text-xl">
            Please provide an ID ...
          </p>
        )}
      </div>
    </>
  );
};

const Share = () => {
  return (
    <Suspense fallback={<LoaderWrapper />}>
      <SharePage />
    </Suspense>
  );
};

export default Share;
