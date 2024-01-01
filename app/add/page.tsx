import AddFriendPageContent from '@/components/AddFriendPageContent'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react'
import React from 'react'

const page = async() => {

  
  // const session =await getServerSession(authOptions)
  return (

    <section className='px-4 bg-indigo-50 rounded-lg h-full'>
        <div className='flex h-full items-center justify-center flex-col'>
            <div className='w-full'>
              <AddFriendPageContent/>
            </div>
        </div>
    </section> 
  )
}

export default page