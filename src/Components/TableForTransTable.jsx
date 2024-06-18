import React from 'react'
import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi2'

export const TableForTransTable = ({ item }) => {
    return (
        <div>

            <tr data-aos="fade-left" data-aos-duration="800" className='hover:bg-[#dab9b93b] border-b text-center'>
                <td>{item.title}</td>
                <td className='flex gap-2 p-1 items-center justify-center'><HiOutlineCurrencyBangladeshi />{item.campFee}</td>
                <th>{item.nameOfParticipant}</th>
                <td>{item?.payStat}</td>
                <td>{item?.payConStat}</td>
                <td>{item?.transactionId}</td>
                <td>{item?.date}</td>
            </tr>

        </div>
    )
}
