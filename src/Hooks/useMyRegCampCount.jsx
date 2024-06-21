import { useQuery } from '@tanstack/react-query'
import { useAxiosSecure } from './useAxiosSecure'
import { ContextApi } from '../Providers/ContextProvider'
import { useContext } from 'react'

export const useMyRegCampCount = () => {

  const axiosSecure = useAxiosSecure()
  const {user}= useContext(ContextApi)

  const { data: myRegCampsCount = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['regCamps'],
    queryFn: () => regCampsData(),
  })

  const regCampsData = async () => {
    const { data } = await axiosSecure(`/myRegCampsCount/${user?.email}`)
    return data.length
  }

  return {myRegCampsCount, isLoading, isError, error, refetch}
}