import React, { useContext} from 'react'
import { Aside } from './Aside'
import { Outlet } from 'react-router-dom'
import { BsMenuButtonWide } from "react-icons/bs";
import { ContextApi } from '../../Providers/ContextProvider';

export const DashBoard = () => {

  const {isAsideOpen, setIsAsideOpen} = useContext(ContextApi)

  const handleAside = () => {
    setIsAsideOpen(!isAsideOpen)
  }

  return (
    <div className='flex gap-3'>
      <div className=''>
        <Aside></Aside>

        <button
          onClick={handleAside}
          className='md:hidden absolute p-2 right-0'
        ><BsMenuButtonWide /></button>
      </div>
      <div className='mt-3 w-full'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
