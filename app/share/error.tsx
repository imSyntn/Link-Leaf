'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

const Error = ({error, reset}:{error:Error, reset: ()=> void}) => {
  console.log(error.message)
  return (
    <div className='min-h-[100vh] flex flex-col justify-center items-center'>
        <h1 className='text-5xl mb-5 text-center leading-[1.1]'>Something went wrong!</h1>
        <Button onClick={reset} className=''>Try Again</Button>
    </div>
  )
}

export default Error