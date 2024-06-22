import React, { useContext, useState } from 'react'
import { SectionHead } from '../../../Components/SectionHead'
import { useTransactionHistory } from '../../../Hooks/useTransactionHistory'
import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { ContextApi } from '../../../Providers/ContextProvider'
import { LoadingSpinnerCircle } from '../../../Components/LoadingSpinnerCircle'
import { useTransactionHistoryCount } from '../../../Hooks/useTransactionHistoryCount'

export const TransactionHistory = () => {
    // const { trasactionData } = useTransactionHistory()
    const { user } = useContext(ContextApi);
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);

    const { trasactionDataLength } = useTransactionHistoryCount()
    // console.log(trasactionDataLength)
    // console.log(currentPage)
    const itemPerPage = 10;
    const numberOfPage = Math.ceil(trasactionDataLength / itemPerPage)
    // console.log(numberOfPage)
    const pages = [...Array(numberOfPage).keys()];
    // console.log(pages)


    const { data: transactionData = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['TransactionHistory', currentPage],
        queryFn: () => transactionDataFun(),
    })
    // console.log(data)

    const transactionDataFun = async () => {
        const { data } = await axiosSecure(`/paymentInfoByCount/${user.email}?page=${currentPage}&&size=${itemPerPage}`);
        return data
    }


    if (isLoading) {
        return <LoadingSpinnerCircle></LoadingSpinnerCircle>
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < numberOfPage - 1) {
            setCurrentPage(currentPage + 1)
        }
    }


    return (
        <div>
            <SectionHead
                title={'Your Transaction History'}
                special={`Mr. ${user.displayName}`}
                para={`find your all transaction history here.`}
            ></SectionHead>
            <div>
                <div className='overflow-x-auto'>
                    <table className="table-xs w-full text-center text-sm ">
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
                                        <tr key={item._id} className='hover:bg-[#dab9b93b] border-b text-center'>
                                            <td>{i + 1}.</td>
                                            <td>{item.title}</td>
                                            <td className='flex gap-2 p-1 items-center justify-center'><HiOutlineCurrencyBangladeshi />{item.campFee}</td>
                                            <td>{item?.payStat}</td>
                                            <td>{item?.payConStat}</td>
                                            <td>{item?.transactionId}</td>
                                            <td>{formattedDate}</td>
                                        </tr>
                                    )

                                })}
                        </tbody>
                    </table>
                    <div className='text-center bg-third backdrop-blur-0 p-2 text-white flex gap-2 justify-center items-center' >
                        <button
                            onClick={handlePrev} className='bg-white text-black hover:bg-fourth duration-500 mr-3 px-3 rounded-full'>Prev</button>
                        {
                            pages && pages.map((page, i) =>
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(page)}
                                    className={`bg-white text-black hover:bg-fourth duration-500 mr-3 px-2 rounded-full ${currentPage === page && 'bg-yellow-800 text-white'}`}
                                >{page + 1}</button>)
                        }
                        <button
                            onClick={handleNext}
                            className='bg-white text-black hover:bg-fourth duration-500 mr-3 px-3 rounded-full'>Next</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
