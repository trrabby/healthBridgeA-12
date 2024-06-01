import React, { useContext } from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { ContextApi } from './ContextProvider';


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
            return <p>Loading....</p>;
        };

        if (!user) {
            return <Navigate to={'/login'} state={location.pathname}> </Navigate>

        }
    }











}





