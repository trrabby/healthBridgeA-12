import { useQuery } from '@tanstack/react-query'
import { useAxiosSecure } from './useAxiosSecure'

export const useTransactionHistoryCount = () => {

  const axiosSecure = useAxiosSecure()

  const { data: trasactionDataLength = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['trasnactionHistory'],
    queryFn: () => trasnactionHistory(),
  })

  const trasnactionHistory = async () => {
    const { data } = await axiosSecure('/paymentInfo')
    return data.length
  }

  return {trasactionDataLength, isLoading, isError, error, refetch}
}
