import { useQuery } from '@tanstack/react-query'
import { useAxiosCommon } from './useAxiosCommon'

export const useAllCamps = () => {

  const axiosCommon = useAxiosCommon()

  const { data: camps = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['camps'],
    queryFn: () => campsData(),
  })

  const campsData = async () => {
    const { data } = await axiosCommon('/camps')
    return data
  }

  return {camps, isLoading, isError, error, refetch}
}
