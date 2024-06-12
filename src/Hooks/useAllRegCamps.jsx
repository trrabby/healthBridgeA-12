import { useQuery } from '@tanstack/react-query'
import { useAxiosSecure } from './useAxiosSecure'

export const useAllRegCamps = () => {

  const axiosSecure = useAxiosSecure()

  const { data: regCamps = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['regCamps'],
    queryFn: () => regCampsData(),
  })

  const regCampsData = async () => {
    const { data } = await axiosSecure('/regCamps')
    return data
  }

  return {regCamps, isLoading, isError, error, refetch}
}
