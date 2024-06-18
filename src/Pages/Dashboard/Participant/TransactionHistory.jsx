import React, { useContext } from 'react'
import { SectionHead } from '../../../Components/SectionHead'
import { useTransactionHistory } from '../../../Hooks/useTransactionHistory'
import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { ContextApi } from '../../../Providers/ContextProvider'
import { LoadingSpinnerCircle } from '../../../Components/LoadingSpinnerCircle'

export const TransactionHistory = () => {
    // const { trasactionData } = useTransactionHistory()
    const {user} = useContext(ContextApi);
    const axiosSecure = useAxiosSecure()

  const { data: transactionData = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['TransactionHistory'],
    queryFn: () => transactionDataFun(),

  })
  // console.log(data)

  const transactionDataFun = async () => {
    const { data } = await axiosSecure(`/PaymentInfoBy/${user.email}`);
    
    return data
  }


  if (isLoading) {
    return <LoadingSpinnerCircle></LoadingSpinnerCircle>
  }



    return (
        <div>
            <SectionHead
                title={'Your Transaction History'}
                special={`Mr. ${user.displayName}`}
                para={`find your all transaction history here.`}
            ></SectionHead>
            <div>
                <div>
                    <table className="table-xs w-full text-center text-sm">
                        <thead className='underline text-center'>
                            <tr>
                                    
                                <th>Ser No</th>
                                <th>Camp Name</th>
                                <th>Camp Fee</th>
                                <th>Payment Status</th>
                                <th>Confirmation Status</th>
                                <th>Trasaction Id</th>
                                <th>Paid On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionData &&
                                transactionData.map((item, i) => {

                                    const date = new Date(item.date);
                                    const formattedDate = date.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        day: 'numeric',
                                        month: 'long',
                                    });


                                    return (
                                        <tr key={item._id} data-aos="fade-left" data-aos-duration="800" className='hover:bg-[#dab9b93b] border-b text-center'>
                                            <td>{i+1}.</td>
                                            <td>{item.title}</td>
                                            <td className='flex gap-2 p-1 items-center justify-center'><HiOutlineCurrencyBangladeshi />{item.campFee}</td>
                                            <td>{item?.payStat}</td>
                                            <td>{item?.payConStat}</td>
                                            <td>{item?.transactionId}</td>
                                            <td>{formattedDate}

                                            </td>
                                        </tr>
                                    )

                                })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
