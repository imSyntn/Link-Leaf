'use client'
import React, { useState } from 'react'
import { useUserContext } from '../UserContext'
import { useToast } from '@/hooks/use-toast'
import { AddLink } from '@/components/AddLink'
import UrlContainer from '@/components/UrlContainer'
import axios from 'axios'

// import { ToastAction } from '@/components/ui/toast'

const Profile = () => {
  const { toast } = useToast()

  const { user, setUser } = useUserContext()

  
  const [btnClicked, setBtnClicked] = useState(false)

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBtnClicked(true)
    axios.get('/api/logout', {withCredentials: true}).then(e => {
      setUser({
        name: '',
        isLoggedin: false,
        isVarified: false
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
    }).finally(()=> setBtnClicked(false))
  }

  return (
    <div className='Profile h-[100vh] pt-28'>
      <button className={`fixed top-5 right-5 px-2 py-1 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-red-600 hover:text-white border-2 border-transparent ${btnClicked ? 'opacity-50' : ''}`} onClick={handleLogOut} style={!user.isLoggedin ? { display: 'none' } : {}} disabled={btnClicked ? true : false}>
        Log out
      </button>
      <div className="userLinks flex flex-col items-center">
        <AddLink buttonText="Add New" delBtn={false} urlObj={null} />
        <UrlContainer />
      </div>
    </div>
  )
}

export default Profile