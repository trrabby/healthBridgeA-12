import { useQuery } from '@tanstack/react-query'
import { useAxiosCommon } from './useAxiosCommon'

export const useAllRegCamps = () => {

  const axiosCommon = useAxiosCommon()

  const { data: regCamps = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['regCamps'],
    queryFn: () => regCampsData(),
  })

  const regCampsData = async () => {
    const { data } = await axiosCommon('/regCamps')
    return data
  }

  return {regCamps, isLoading, isError, error, refetch}
}
