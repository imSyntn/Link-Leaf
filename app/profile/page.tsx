'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useUserContext } from '../UserContext'
import { useToast } from '@/hooks/use-toast'
import { AddLink } from '@/components/AddLink'
import UrlContainer, { urlType } from '@/components/UrlContainer'
import axios from 'axios'
import { IconProgressAlert, IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'
// import { Drawer } from 'vaul'
import DrawerComp from '@/components/Drawer'
import { ShareBtn } from '@/components/ShareButton'

// import { ToastAction } from '@/components/ui/toast'

const Profile = () => {
  const { toast } = useToast()
  const router = useRouter()

  const { user, setUser } = useUserContext()


  const [btnClicked, setBtnClicked] = useState(false)
  const [update, setUpdate] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [userLinks, setUserLinks] = useState<urlType[]>([])

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBtnClicked(true)
    axios.get('/api/logout', { withCredentials: true }).then(e => {
      setUser({
        name: '',
        isLoggedin: false,
        isVarified: false,
        id: null
      })
      toast({
        title: "Logged out.",
        description: e.data.msg
      })
    }).catch(e => {
      toast({
        title: "Error",
        description: 'Error occured.'
      })
    }).finally(() => setBtnClicked(false))
  }


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!user.isLoggedin) {
      timer = setTimeout(() => {
        router.push('/signup')
      }, 1500)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [user])

  useEffect(() => {
    if (user.isLoggedin == true) {
      setLoading(true)
      axios.get('/api/profile', { withCredentials: true })
        .then(e => {
          console.log(e)
          setUserLinks(e.data)
        })
        .catch(e => console.log(e))
        .finally(() => setLoading(false))
    }
  }, [update])

  const changeUpdate = useCallback(() => {
    setUpdate(prev => !prev)
  }, [update])

  return (

    <div className="min-h-[100vh] flex justify-center items-center">
      {
        !user.isLoggedin ? (
          <p className='text-2xl  tracking-widest text-center pt-10'>You are being redirected ...</p>
        ) : (
          <div className='Profile h-auto pt-24 px-6 w-[100vw]'>
            <button className={`fixed top-5 right-5 px-2 py-1 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-red-600 hover:text-white border-2 border-transparent ${btnClicked ? 'opacity-50' : ''} z-10`} onClick={handleLogOut} style={!user.isLoggedin ? { display: 'none' } : {}} disabled={btnClicked ? true : false}>
              Log out
            </button>

            <div className='border-2 border-gray-700 rounded-lg mb-5 flex items-center justify-between p-3'>
              <div className=" flex items-center">
                <img src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png" alt="profile pic" className='w-14' />

                <div className="text flex flex-col items-center">
                  <p className='ml-3 flex items-center text-white text-[1.1rem]'>{user.name} {
                    user.isVarified ? (
                      <IconRosetteDiscountCheckFilled className='text-blue-500 ml-1' />
                    ) : (
                      <IconProgressAlert className='text-red-400 ml-1' />
                    )
                  }</p>
                  {
                    // <button className='bg-white text-black px-2 py-1 font-medium text-sm mt-1' onClick={handleVarification}>Get Varified</button>

                    !user.isVarified && <DrawerComp changeUpdate={changeUpdate} />
                  }
                </div>

                {/* </p> */}
              </div>
              <AddLink buttonText="Edit Profile" delBtn={false} urlObj={null} changeUpdate={changeUpdate} editProfile={true} />
            </div>
            <div className="userLinks flex flex-col items-center w-full">
              <div className='flex w-full justify-center'>
                <AddLink buttonText="Add New" delBtn={false} urlObj={null} changeUpdate={changeUpdate} editProfile={false} />
                <ShareBtn header='Profile' description='Share all your social links in one place with dynamic animations and a clean interface.' link={`${window.location.origin}/share?id=${user.id}`} />
              </div>
              <UrlContainer changeUpdate={changeUpdate} loading={loading} userLinks={userLinks} />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Profile