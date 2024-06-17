import { useQuery } from '@tanstack/react-query'
import { useAxiosSecure } from './useAxiosSecure'

export const useFeedback = () => {

  const axiosSecure = useAxiosSecure()

  const { data: feedbackDataArr = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['feedbackData'],
    queryFn: () => feedbackData(),
  })

  const feedbackData = async () => {
    const { data } = await axiosSecure('/feedback')
    return data
  }

  return {feedbackDataArr, isLoading, isError, error, refetch}
}
