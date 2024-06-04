import React, { useContext } from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { ContextApi } from './ContextProvider';
import { CgSpinnerTwoAlt } from 'react-icons/cg';


export const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(ContextApi)
    const location = useLocation()
    // console.log(location.pathname)
    // console.log(loading)
    if (user) {

        return children
    }


    else {

        if (loading) {
            return <div className='w-full flex items-center justify-center'>
                <CgSpinnerTwoAlt className=" flex items-center justify-center animate-spin h-14 w-14 text-fourth"/>
            </div>;
        };

        if (!user) {
            return <Navigate to={'/joinUs'} state={location.pathname}> </Navigate>

        }
    }











}





