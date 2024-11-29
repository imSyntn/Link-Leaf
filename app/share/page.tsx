"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
// import { useToast } from '@/hooks/use-toast'
import { dropdownValue } from '@/lib/DropdownValue'
import { FaXTwitter as Twitter, FaInstagram as Instagram, FaShare } from "react-icons/fa6";
import { FiYoutube as Youtube } from "react-icons/fi";
import { BsTiktok as Tiktok } from "react-icons/bs";
import { BiLogoLinkedin as Linkedin } from "react-icons/bi";
import { AiOutlineSpotify as Spotify } from "react-icons/ai";
import { motion } from 'framer-motion'
import { ShareBtn } from '@/components/ShareButton'

interface linkType {
  id: number,
  siteName: string,
  siteURL: string,
  description: string,
  userId: number
}

interface dataType {
  email: string,
  isVarified: boolean,
  name: string,
  links: linkType[]
}

const Share = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  // const { toast } = useToast()

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>({
    "email": "ssayantan84@gmail.com",
    "isVarified": false,
    "name": "Sayantan Sarkar",
    "links": [
      {
        "id": 7,
        "siteName": "Dribble",
        "siteURL": "https://dribbble.com/",
        "description": "Designs",
        "userId": 21
      },
      {
        "id": 10,
        "siteName": "Twitter",
        "siteURL": "https://x.com/",
        "description": "sdfd",
        "userId": 21
      },
      {
        "id": 11,
        "siteName": "Neon",
        "siteURL": "https://neon.tech",
        "description": "Posrgress server",
        "userId": 21
      },
      {
        "id": 17,
        "siteName": "Spotify",
        "siteURL": "https://open.spotify.com/",
        "description": "Spotify",
        "userId": 21
      },
      {
        "id": 12,
        "siteName": "Youtube",
        "siteURL": "ada",
        "description": "asdasd",
        "userId": 21
      },
      {
        "id": 13,
        "siteName": "Instagram",
        "siteURL": "adsad",
        "description": "asdas",
        "userId": 21
      },
      {
        "id": 14,
        "siteName": "Tiktok",
        "siteURL": "asdasd",
        "description": "asdasd",
        "userId": 21
      },
      {
        "id": 15,
        "siteName": "Linkedin",
        "siteURL": "asas",
        "description": "asasdas",
        "userId": 21
      },
      {
        "id": 16,
        "siteName": "Linktree",
        "siteURL": "https://linktr.ee/",
        "description": "asasdas",
        "userId": 21
      }
    ]
  })

  // useEffect(() => {
  //   if (id) {
  //     setLoading(true)
  //     axios.get(`/api/share?id=${id}`)
  //       .then(e => {
  //         if (e.data.status == 400) {
  //           toast({
  //             title: 'Error.',
  //             description: e.data.msg
  //           })
  //         } else {
  //           setData(e.data.userData[0])
  //         }
  //       })
  //       .catch(e => toast({
  //         title: 'Error',
  //         description: 'Error Occured'
  //       }))
  //       .finally(() => setLoading(false))
  //   }
  // }, [])

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
        damping: 10
      }
    },
  };

  const divItemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10
      }
    },
  };

  const iconSelect = (name: string) => {
    if (name == 'twitter') {
      return Twitter
    } else if (name == 'youtube') {
      return Youtube
    } else if (name == 'instagram') {
      return Instagram
    } else if (name == 'tiktok') {
      return Tiktok
    } else if (name == 'linkedin') {
      return Linkedin
    } else if (name == 'spotify') {
      return Spotify
    } else return null
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='h-[100vh]'>
      {
        (id) ? (
          <>
            <div className=' h-[30%] relative'>
              <img src="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/svg.png" className='h-[100%] w-[100vw]' alt="" />
              <img src="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/square%20astronaut-min.png" alt="Profile pic" className='w-48 h-48 rounded-full absolute left-[50%] bottom-0 translate-x-[-50%]' />
            </div>
            {
              (data && !loading) && (
                <>
                  <div className="details flex flex-col justify-between items-center px-10">
                    <h1 className='text-3xl my-3'>{data.name}</h1>
                    <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ut similique voluptas doloremque nostrum, dolor maiores quis vero quia. Quisquam cupiditate harum nostrum veniam ut deleniti blanditiis. Officia, facilis delectus! Alias excepturi fugiat dolore temporibus deserunt. Excepturi adipisci debitis ipsam, dolorum cupiditate id dolore quaerat placeat neque odit magnam sunt?</p>
                  </div>
                  <motion.div variants={containerVariants} initial='hidden' animate='visible'>
                    <div className="w-full px-10 flex justify-center my-5">
                      {
                        data.links?.map((item: linkType, index: number) => {
                          if (dropdownValue.slice(0, dropdownValue.length - 1).find((dropData) => {
                            return dropData.value.toLowerCase() == item.siteName.toLowerCase()
                          })) {
                            const Icon = iconSelect(item.siteName.toLowerCase()) as React.ElementType
                            return <motion.a key={item.id} href={item.siteURL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex justify-center items-center rounded-full mx-1 shadow-md bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]" variants={itemVariants} whileHover={{ scale: 1.2 }}>{<Icon className='text-black text-2xl' />}</motion.a>
                          }
                        })
                      }
                    </div>
                    <div className="flex flex-col px-10">
                      {
                        data.links?.map((item: linkType, index: number) => {
                          if (!dropdownValue.slice(0, dropdownValue.length - 1).find((dropData) => {
                            return dropData.value.toLowerCase() == item.siteName.toLowerCase()
                          })) {
                            return <motion.div key={item.id} className='relative flex items-center justify-between my-1 border border-gray-500 rounded-sm p-3 cursor-pointer' variants={divItemVariants}>
                              <a href={item.siteURL} target='_blank' className=' w-[100%] flex items-center justify-between border border-blue-200 '>
                                <img src={`https://www.google.com/s2/favicons?domain=${item.siteURL}&sz=128`} alt={item.siteName} className='w-10 h-10 rounded-sm' />
                                <p className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>{item.description}</p>
                              </a>
                              <div className='border border-red-50 w-[70px]'>
                                <ShareBtn header={''} description={''} link={''} />
                              </div>
                            </motion.div>
                          }
                        })
                      }
                    </div>
                  </motion.div>
                </>
              )
            }
          </>
        ) : (
          <p className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-nowrap text-xl'>Please provide an ID ...</p>
        )
      }
    </div>
  )
}

export default Share