import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Aside = () => {
  return (
    <div className='bg-primary w-60 h-[calc(100vh-100px)] text-base text-black font-bold py-2 mt-3 rounded-lg flex flex-col md:sticky top-[90px]  md:translate-x-0'>
        
        <NavLink 
        to={'organizerProfile'}
        className={({ isActive }) => isActive ? 'text-third font-extrabold p-2 text-right underline' : 'hover:text-third hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Organizer's Profile</NavLink>
        
        <NavLink 
        to={'addACamp'}
        className={({ isActive }) => isActive ? 'text-third underline font-extrabold p-2 text-right' : 'hover:text-third hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Add A Camp</NavLink>
       
        <NavLink 
        to={'mngCamp'}
        className={({ isActive }) => isActive ? 'text-third underline font-extrabold p-2 text-right' : 'hover:text-third hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Manage Camp</NavLink>
        <NavLink 
        to={'mngRegCamp'}
        className={({ isActive }) => isActive ? 'text-third underline font-extrabold p-2 text-right' : 'hover:text-third hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Manage Registered Camp</NavLink> <hr />
        
        {/* For Participants */}
        <NavLink 
        to={'analytics'}
        className={({ isActive }) => isActive ? 'text-third underline font-extrabold p-2 text-right' : 'hover:text-third hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Analytics</NavLink>
       
        <NavLink 
        to={'participantProfile'}
        className={({ isActive }) => isActive ? 'text-third underline font-extrabold p-2 text-right' : 'hover:text-third hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Participant Profile</NavLink>

        <NavLink 
        to={'regCamps'}
        className={({ isActive }) => isActive ? 'text-third underline font-extrabold p-2 text-right' : 'hover:text-third hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Registerd Camps</NavLink>
       
        <NavLink 
        to={'paymentHistory'}
        className={({ isActive }) => isActive ? 'text-third underline font-extrabold p-2 text-right' : 'hover:text-third hover:underline p-2 font-bold text-right hover:duration-500 hover:bg-accent'} >Payment History</NavLink> <hr />
       
    </div>
  )
}
