import React, { useContext } from 'react'
import { useAxiosSecure } from './useAxiosSecure'
import { ContextApi } from '../Providers/ContextProvider'
import { useQuery } from '@tanstack/react-query'

export const useAdminRole = () => {

    const axiosSecure = useAxiosSecure()
    const { user, loading } = useContext(ContextApi)

    const { data: userRole} = useQuery({
        queryKey: ['role'],
        enabled: !loading && !!user?.email,
        queryFn: () => role(),
    })

    const role = async () => {
        const { data } = await axiosSecure(`/user/${user?.email}`)
        return data?.role
    }

    return userRole
}
