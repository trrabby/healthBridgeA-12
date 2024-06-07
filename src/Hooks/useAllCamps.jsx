import { useQuery } from '@tanstack/react-query'
import { useAxiosCommon } from './useAxiosCommon'
import { LoadingSpinnerCircle } from '../Components/LoadingSpinnerCircle'



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

  // if (isError) {
  //   console.log(error)
  // }

  // if (isLoading) {
  //   return <LoadingSpinnerCircle></LoadingSpinnerCircle>;
  // }
  return {camps, isLoading, isError, error, refetch}
}
