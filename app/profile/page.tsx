'use client'
import React from 'react'
import { useToast } from '@/hooks/use-toast'
import { AddLink } from '@/components/AddLink'
import UrlContainer from '@/components/UrlContainer'

// import { ToastAction } from '@/components/ui/toast'

const Profile = () => {
  const { toast } = useToast()
  return (
    <div className='Profile h-[100vh] pt-28'>
      <button className="fixed top-5 right-5 px-2 py-1 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-red-600 hover:text-white border-2 border-transparent" onClick={() => 
      toast({
        title: "Logged out.",
        description: "Logged out successfully."
      })
      }>
        Log out
      </button>
      <div className="userLinks flex flex-col items-center">
        <AddLink buttonText="Add New" delBtn={false} urlObj={false} />
        <UrlContainer />
      </div>
    </div>
  )
}

export default Profile