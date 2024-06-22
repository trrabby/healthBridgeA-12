import { useQuery } from '@tanstack/react-query'
import { useAxiosSecure } from './useAxiosSecure'
import { useContext } from 'react'
import { ContextApi } from '../Providers/ContextProvider'

export const useTransactionHistoryCount = () => {
  const {user} = useContext(ContextApi)
  const axiosSecure = useAxiosSecure()

  const { data: trasactionDataLength = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['trasnactionHistory'],
    queryFn: () => trasnactionHistory(),
  })

  const trasnactionHistory = async () => {
    const { data } = await axiosSecure(`/paymentInfoBy/${user.email}`)
    return data.length
  }

  return {trasactionDataLength, isLoading, isError, error, refetch}
}
