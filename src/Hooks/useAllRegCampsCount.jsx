import { useQuery } from '@tanstack/react-query'
import { useAxiosSecure } from './useAxiosSecure'

export const useAllRegCampsCount = () => {

  const axiosSecure = useAxiosSecure()

  const { data: regCampsCount = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['regCampsCount'],
    queryFn: () => regCampsDataCount(),
  })

  const regCampsDataCount = async () => {
    const { data } = await axiosSecure('/regCamps')
    return data.length
  }

  return {regCampsCount, isLoading, isError, error, refetch}
}
