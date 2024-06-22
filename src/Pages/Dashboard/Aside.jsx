import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAdminRole } from '../../Hooks/useAdminRole'
import { ContextApi } from '../../Providers/ContextProvider'

export const Aside = () => {
  const userRole = useAdminRole()
  const organizer = userRole === "organizer"
  const participant = userRole === "participant"
  // console.log(userRole)
  const {isAsideOpen, setIsAsideOpen} = useContext(ContextApi)


  return (
    <div className={`bg-accent w-64 h-[calc(100vh-100px)] text-base text-white font-bold py-2 rounded-lg flex flex-col md:sticky top-[90px] md:translate-x-0 absolute md:mt-0 mt-[-5px] duration-500 z-40 ${isAsideOpen? 
      "translate-x-0": "translate-x-[-300px]"
    }`}>

      {
        organizer && <div className='flex flex-col'>
          <NavLink
            to={'profile'}
            onClick={()=>setIsAsideOpen(false)}
            className={({ isActive }) => isActive ? 'text-white font-extrabold p-2 text-right underline' : 'hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Organizer's Profile</NavLink>

          <NavLink
            to={'addACamp'}
            onClick={()=>setIsAsideOpen(false)}
            className={({ isActive }) => isActive ? 'text-white underline font-extrabold p-2 text-right' : 'hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Add A Camp</NavLink>

          <NavLink
            to={'manageCamp'}
            onClick={()=>setIsAsideOpen(false)}
            className={({ isActive }) => isActive ? 'text-white underline font-extrabold p-2 text-right' : 'hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Manage Camp</NavLink>
          <NavLink
            to={'mngRegCamp'}
            onClick={()=>setIsAsideOpen(false)}
            className={({ isActive }) => isActive ? 'text-white underline font-extrabold p-2 text-right' : 'hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Manage Registered Camp</NavLink> <hr />
        </div>
      }

      {/* For Participants */}
      {
        participant && <div className='flex flex-col'>
          <NavLink
            to={'analytics'}
            onClick={()=>setIsAsideOpen(false)}
            className={({ isActive }) => isActive ? 'text-white underline font-extrabold p-2 text-right' : 'hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Analytics</NavLink>

          <NavLink
            to={'profile'}
            onClick={()=>setIsAsideOpen(false)}
            className={({ isActive }) => isActive ? 'text-white underline font-extrabold p-2 text-right' : 'hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Participant Profile</NavLink>

          <NavLink
            to={'regAndPay'}
            onClick={()=>setIsAsideOpen(false)}
            className={({ isActive }) => isActive ? 'text-white underline font-extrabold p-2 text-right' : 'hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Registerd Camps</NavLink>

          <NavLink
            to={'paymentHistory'}
            onClick={()=>setIsAsideOpen(false)}
            className={({ isActive }) => isActive ? 'text-white underline font-extrabold p-2 text-right' : 'hover:text-white hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Payment History</NavLink> <hr />
        </div>
      }

    </div>
  )
}
