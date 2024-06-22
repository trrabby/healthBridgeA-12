import React from 'react'
import { ComplexNavbar } from '../Components/ComplexNavbar'
import { Outlet, useLocation } from 'react-router-dom'

/* Animate css and aos imports */
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
AOS.init();
import 'animate.css';
import { Footer } from '../Pages/Footer';

export const MainLayout = () => {
  const location = useLocation()

  return (
    <div className='container mx-auto'>
      <ComplexNavbar></ComplexNavbar>
      <Outlet></Outlet>
      {window.location.pathname == '/' && <Footer></Footer>}

    </div>
  )
}
