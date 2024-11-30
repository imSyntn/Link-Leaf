import React, { useEffect } from 'react'
import { useUserContext } from '@/app/UserContext'
import UrlCard from './UrlCard'

export interface urlType {
  siteName: string,
  siteURL: string,
  description: string,
  id: number
}

const UrlContainer = ({ changeUpdate, loading, userLinks }: { changeUpdate: () => void, loading: boolean, userLinks: urlType[] }) => {

  const { user } = useUserContext()




  useEffect(() => {
    console.log(userLinks)
  }, [userLinks])

  return (
    <div className={` w-full border-2 border-gray-700 mt-6 relative overflow-x-auto shadow-md sm:rounded-lg ${user.isLoggedin ? '' : 'border-none'}`}>
      {/* {
        !user.isLoggedin ? (
          <p className='text-2xl  tracking-widest text-center pt-10'>You are being redirected ...</p>
        ) : ( */}
      {
        loading ? (
          <h2 className='text-center my-6 text-xl'>Loading...</h2>
        ) : (userLinks.length < 1) ? (
          <h2 className='text-center my-6 text-xl'>No Links Available.</h2>
        ) : (
          < table className='w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
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
                  <UrlCard key={index} urlObj={item} changeUpdate={changeUpdate} />
                ))
              }
            </tbody>
          </table>
        )


      }
    </div >
  )
}

export default UrlContainer