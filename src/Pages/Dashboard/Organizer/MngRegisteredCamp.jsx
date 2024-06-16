import React from 'react'
import { SectionHead } from '../../../Components/SectionHead'
import { useAllRegCamps } from '../../../Hooks/useAllRegCamps'
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi2";
import { Button } from '@headlessui/react';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { handleDelete } from '../../../Components/utilities/handleDelete';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import { LoadingSpinner } from '../../../Components/LoadingSpinner';
import toast from 'react-hot-toast';



export const MngRegisteredCamp = () => {


  const axiosSecure = useAxiosSecure();

  const { regCamps, refetch, isLoading } = useAllRegCamps()
  // console.log(regCamps)

  const deleteHandler = async (idData) => {
    try {
      await handleDelete(idData, refetch)
    }
    catch (err) {
      console.log(err)
    }

  }

  if (isLoading) {
    <LoadingSpinner></LoadingSpinner>
  }

  const handlePayConStat = async (id, payStat) => {

      if(payStat === "Unpaid"){
        return toast.error("Participant Didn't Pay Yet")
      }

    await axiosSecure.put(`/regCamps_default/${id}`, {
      payConStat: "Confirmed",
    })

    await axiosSecure.put(`/paymentInfo/${id}`, {
      payConStat: "Confirmed",
    })
    refetch()
  }

  return (
    <div>
      <SectionHead
        title={'Manage Registered Camps'}
      ></SectionHead>
      <div>
        <div>
          <table className="table-sm w-full text-center">
            {/* head */}
            <thead className='underline text-center' >
              <tr >
                <th>Participant Name</th>
                <th>Camp Name</th>
                <th>Camp Fee</th>
                <th>Payment Status</th>
                <th>Confirmation Status</th>
                <th>Cancel</th>
                

              </tr>
            </thead>
            <tbody >
              {regCamps &&
                regCamps.map((item, i) => <tr key={item._id} data-aos="fade-left" data-aos-duration="800" className='hover:bg-[#dab9b93b] border-b text-center'>
                  <th>{item.nameOfParticipant}</th>
                  <td>{item.title}</td>
                  <td className='flex gap-2 p-1 items-center justify-center'><HiOutlineCurrencyBangladeshi />{item.campFee}</td>
                  <td>{item?.payStat}</td>
                  <td>
                    <Button
                      onClick={() => handlePayConStat(item._id, item?.payStat )}
                      className={` p-1 px-3 ${item?.payConStat === "Pending" ? "bg-accent border hover:bg-fourth  text-white" : "bg-none"} rounded-lg  duration-300`}>{isLoading ? <LoadingSpinner></LoadingSpinner> : item?.payConStat}</Button></td>
                  
                  <td>
                    {item?.payStat === "Paid" && item?.payConStat === "Confirmed" ?
                    <button className='p-1 disabled cursor-not-allowed'><TiTick className='text-green-600' /></button> :
                    <button onClick={() => deleteHandler(`/regCamps/${item._id}`)} className='border p-1 hover:bg-red-600 hover:text-white rounded-lg duration-700'><RxCross2 /></button>
                  }
                  </td>
                  
                </tr>

                )

              }


            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
