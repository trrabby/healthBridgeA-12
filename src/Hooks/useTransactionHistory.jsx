import { useQuery } from '@tanstack/react-query'
import { useAxiosSecure } from './useAxiosSecure'

export const useTransactionHistory = () => {

  const axiosSecure = useAxiosSecure()

  const { data: trasactionData = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['trasnactionHistory'],
    queryFn: () => trasnactionHistory(),
  })

  const trasnactionHistory = async () => {
    const { data } = await axiosSecure('/paymentInfo')
    return data
  }

  return {trasactionData, isLoading, isError, error, refetch}
}
