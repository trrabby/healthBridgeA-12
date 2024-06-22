import { useQuery } from '@tanstack/react-query'
import { useAxiosCommon } from './useAxiosCommon'

export const useTopPopularCamps = () => {

  const axiosCommon = useAxiosCommon()

  const { data: mostRegCamps = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['Topcamps'],
    queryFn: () => topCampsData(),
  })

  const topCampsData = async () => {
    const { data } = await axiosCommon('/mostReg')
    return data
  }

  return {mostRegCamps, isLoading, isError, error, refetch}
}
