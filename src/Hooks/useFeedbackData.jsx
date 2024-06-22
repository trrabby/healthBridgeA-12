import { useQuery } from '@tanstack/react-query'
import { useAxiosCommon } from './useAxiosCommon'

export const useFeedbackData = () => {

  const axiosCommon = useAxiosCommon()

  const { data: feedback = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['feedback'],
    queryFn: () => feedbackData(),
  })

  const feedbackData = async () => {
    const { data } = await axiosCommon('/feedback')
    return data
  }

  return {feedback, isLoading, isError, error, refetch}
}
