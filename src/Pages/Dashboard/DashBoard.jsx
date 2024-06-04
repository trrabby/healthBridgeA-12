import React from 'react'
import { Aside } from './Aside'
import { Outlet } from 'react-router-dom'

export const DashBoard = () => {
  return (
    <div className='flex gap-3'>
      <div className=''>
        <Aside></Aside>
      </div>
      <div className='mt-3 w-full'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
