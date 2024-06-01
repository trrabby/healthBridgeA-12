import React from 'react'
import { ComplexNavbar } from '../Components/ComplexNavbar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className='container mx-auto'>
        <ComplexNavbar></ComplexNavbar>
        <Outlet></Outlet>
    </div>
  )
}
