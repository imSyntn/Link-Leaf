import React, { MouseEvent, useRef } from "react";
import { motion } from "framer-motion";
import { ShareBtn } from "./ShareButton";
import Image from "next/image";
import { dropdownValue } from "@/lib/DropdownValue";
import Svg from "@/app/share/Svg";
import { useUserContext } from "@/app/UserContext";
import { urlType } from "./UrlContainer";
import { iconSelect } from "@/lib/DropdownValue";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const Preview = ({
  setShowPreview,
  userLinks,
}: {
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  userLinks: urlType[];
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUserContext();

  const vatiants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const closeModal = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target as Node)) {
      setShowPreview(false);
    }
  };

  // useEffect(()=> {
  //   document.body.addEventListener('touchmove', (e)=> e.preventDefault())
  // },[])

  return (
    <motion.div
      variants={vatiants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full h-full bg-[#000000cc] fixed top-0 !z-[70] flex justify-center items-end pb-3 overscroll-contain"
      onMouseDown={closeModal}
    >
      <div
        className=" relative w-[360px] h-[650px] bg-black rounded-3xl overflow-y-auto scrollbar-none pb-28 border-2 border-white"
        ref={modalRef}
      >
        <div className="relative flex justify-center items-end">
          <Svg
            pic={user.profilePic}
            TailwindClass="h-[100%] absolute left-[50%] bottom-0 translate-x-[-50%]"
          />
          {/* <img src="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/svg.png" className='h-[100%] w-[100vw]  absolute left-[50%] bottom-0 translate-x-[-50%]' alt="" /> */}
          <motion.img
            src={user.profilePic}
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
        {user && (
          <>
            <div className="details flex flex-col justify-between items-center px-5 sm:px-10">
              <h1 className="text-3xl font-semibold tracking-wide my-3">
                {user.name}
              </h1>
              {/* <p className="text-center text-lg">{user.description}</p> */}
            </div>
            {userLinks.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="w-full flex justify-center my-5">
                  {userLinks.map((item: urlType) => {
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
                <div className="flex flex-col items-center px-5">
                  {userLinks.map((item: urlType) => {
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
                          className="linkCard relative flex items-center justify-between my-1 border rounded-full border-gray-500 py-3 px-6 cursor-pointer hover:text-black w-full"
                          variants={divItemVariants}
                          whileHover={{
                            backgroundColor: "white",
                          }}
                        >
                          <a
                            href={item.siteURL}
                            target="_blank"
                            className=" w-[100%] flex items-center justify-between"
                          >
                            <Image
                              width={40}
                              height={40}
                              src={`https://www.google.com/s2/favicons?domain=${item.siteURL}&sz=128`}
                              alt={item.siteName}
                              className="rounded-sm"
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
                <p className="text-2xl tracking-wider">No links shared😓.</p>
              </div>
            )}
          </>
        )}
      </div>
      {/* <div className="w-full flex justify-center mt-9"> */}
      <div className="bg-slate-800 no-underline group cursor-pointer shadow-2xl shadow-zinc-900 rounded-full p-px text-md font-semibold leading-6  text-white inline-block absolute bottom-11">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-6 ring-1 ring-white/10 ">
          <span>Close</span>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </div>
      {/* </div> */}
    </motion.div>
  );
};

export default Preview;
