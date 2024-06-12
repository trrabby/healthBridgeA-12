import React, { useContext } from 'react'
import { SectionHead } from '../../../Components/SectionHead'
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { ContextApi } from '../../../Providers/ContextProvider'

export const Analytics = () => {

    const axiosSecure = useAxiosSecure()
    const {user} = useContext(ContextApi)

    const { data: myCamps = [], isLoading, isError, error, refetch } = useQuery({
      queryKey: ['regCamps'],
      queryFn: () => myRegCampsData(),
    })
  
    const myRegCampsData = async () => {
      const { data } = await axiosSecure(`/myRegCamps/${user.email}`)
      return data
    }

  return (
    <div>
        <SectionHead
        title={"Registered Camps' Analytics"}
        ></SectionHead>
        <div>

        </div>
    </div>
  )
}
