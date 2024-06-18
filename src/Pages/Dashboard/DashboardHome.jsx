import React, { useContext } from 'react'
import { ContextApi } from '../../Providers/ContextProvider'
import { useAdminRole } from '../../Hooks/useAdminRole'

export const DashboardHome = () => {
    const { user } = useContext(ContextApi)
    const userRole = useAdminRole()
    console.log(userRole)
    return (
        <div className='flex flex-col items-center justify-center min-h-[calc(100vh-100px)] gap-3'>
            <h1 className='text-fourth font-bold text-4xl'>Hi {user.displayName} </h1>
            <h2 className='capitalize font-bold text-2xl'>Welcome to {userRole}'s dashboard </h2>
        </div>
    )
}
