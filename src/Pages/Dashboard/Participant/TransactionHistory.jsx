import React from 'react'
import { SectionHead } from '../../../Components/SectionHead'
import { useTransactionHistory } from '../../../Hooks/useTransactionHistory'
import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'

export const TransactionHistory = () => {
    const {trasactionData} = useTransactionHistory()
    console.log(trasactionData)

  return (
    <div>
        <SectionHead
            title={'Your Transaction History'}
            para={'Find your all transaction history'}
        ></SectionHead>
        <div>
        <div>
                <table className="table-sm w-full text-center">
                    <thead className='underline text-center'>
                        <tr>
                            <th>Camp Name</th>
                            <th>Camp Fee</th>
                            <th>Participant Name</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Trasaction Id</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trasactionData &&
                            trasactionData.map((item, i) => (
                                <tr key={item._id} data-aos="fade-left" data-aos-duration="800" className='hover:bg-[#dab9b93b] border-b text-center'>
                                    <td>{item.title}</td>
                                    <td className='flex gap-2 p-1 items-center justify-center'><HiOutlineCurrencyBangladeshi />{item.campFee}</td>
                                    <th>{item.nameOfParticipant}</th>
                                    <td>{item?.payStat}</td>
                                    <td>{item?.payConStat}</td>
                                    <td>{item?.transactionId}</td>
                                    <td>{new Date(item?.date)}

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
           
        </div>
    </div>
  )
}
