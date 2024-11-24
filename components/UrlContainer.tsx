import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/app/UserContext'
import UrlCard from './UrlCard'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export interface urlType {
  siteName: string,
  siteURL: string,
  description: string,
  id: number
}

const UrlContainer = () => {

  const router = useRouter()
  const { user } = useUserContext()

  const [userLinks, setUserLinks] = useState([])

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
      axios.get('/api/profile', { withCredentials: true })
        .then(e => {
          console.log(e)
          setUserLinks(e.data)
        })
        .catch(e => console.log(e))
    }
  },[])

  useEffect(()=> {
    console.log(userLinks)
  },[userLinks])

  return (
    <div className={`h-full w-[100vw] border-2 border-gray-700 mt-6 relative overflow-x-auto shadow-md sm:rounded-lg ${user.isLoggedin ? '' : 'border-none'}`}>
      {
        !user.isLoggedin ? (
          <p className='text-2xl  tracking-widest text-center pt-10'>You are being redirected ...</p>
        ) : (
          (userLinks.length < 1) ? (
            <h2 className='text-center my-6 text-xl'>No Links Available.</h2>
          ) : (
            <table className='w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
              <thead className='border-b text-lg text-gray-700 uppercas dark:text-white bg-[#1e293b4a]'>
                <tr>
                  <th scope="col" className="px-6 py-3">Site Name</th>
                  <th scope="col" className="px-6 py-3">Site URL</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  userLinks.map((item: urlType, index: number) => (
                    <UrlCard key={index} urlObj={item} />
                  ))
                }
              </tbody>
            </table>
          )
        )
      }
    </div>
  )
}

export default UrlContainer