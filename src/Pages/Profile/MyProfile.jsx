import React, { useContext } from 'react'
import { ContextApi } from '../../Providers/ContextProvider'
import { useAdminRole } from '../../Hooks/useAdminRole'
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';
import { TbActivityHeartbeat } from 'react-icons/tb';

export const MyProfile = () => {
  const { user } = useContext(ContextApi)
  // console.log(user)
  const userRole = useAdminRole()
  // console.log(userRole)

  return (
    <div>
      <div className='bg-[url(https://i.ibb.co/L9LCF3p/kenrick-mills-rfe-PWka7-VPU-unsplash-1.jpg)] min-h-screen bg-cover bg-center flex flex-col items-center justify-center rounded-lg'>
        <div className='flex flex-col text-white gap-10 items-center p-5 py-10 bg-[#15514f59] w-8/12 justify-center mt-4 rounded-xl'>
          <div className='flex items-center justify-center gap-5'>
            <img className='w-32 h-32 rounded-full' src={user.photoURL} alt="" />
            <div className='text-2xl'>
              <p className='flex gap-3 items-center font-extrabold'><FaUserAlt className='text-primary' /> {user.displayName}</p>
              <p className='flex gap-3 items-center'><MdEmail className='text-primary'/> {user.email}</p>
              <p className='flex gap-3 items-center'> <TbActivityHeartbeat className='text-primary' />Role: <span className='capitalize  '>{userRole}</span> </p>
            </div>
          </div>
          <div>
            <h1 className='font-extrabold text-fourth text-2xl'>Want to update profile?</h1>


          </div>
        </div>

      </div>
    </div>
  )
}
