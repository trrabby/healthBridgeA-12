import { useQuery } from '@tanstack/react-query'
import { useAxiosCommon } from './useAxiosCommon'

export const useAllCampsCount = () => {

  const axiosCommon = useAxiosCommon()

  const { data: campsCount = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['camps'],
    queryFn: () => campsData(),
  })

  const campsData = async () => {
    const { data } = await axiosCommon('/campsDataLengthPagination')
    return data.length
  }

  return {campsCount, isLoading, isError, error, refetch}
}
