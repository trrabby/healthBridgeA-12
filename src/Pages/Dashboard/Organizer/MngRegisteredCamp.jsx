import React, { useContext, useState } from 'react'
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
import { ContextApi } from '../../../Providers/ContextProvider';
import { LoadingSpinnerCircle } from '../../../Components/LoadingSpinnerCircle';
import { useAllRegCampsCount } from '../../../Hooks/useAllRegCampsCount';
import { useQuery } from '@tanstack/react-query';



export const MngRegisteredCamp = () => {

  const { loading, setLoading } = useContext(ContextApi)
  const [currentPage, setCurrentPage] = useState(0);
  const axiosSecure = useAxiosSecure();

  // const { regCamps, refetch, isLoading } = useAllRegCamps();
  const { regCampsCount } = useAllRegCampsCount()
  // console.log(regCampsCount)

  const itemPerPage = 10;
  const numberOfPage = Math.ceil(regCampsCount / itemPerPage)
  // console.log(numberOfPage)
  const pages = [...Array(numberOfPage).keys()];
  // console.log(pages)

  const { data: regCamps = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['regCamps', currentPage],
    queryFn: () => regCampsData(),
  })

  const regCampsData = async () => {
    const { data } = await axiosSecure(`/regCampsPagination?page=${currentPage}&&size=${itemPerPage}`)
    return data
  }

  if(loading || isLoading){
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

  const deleteHandler = async (idData) => {

    try {
      await handleDelete(idData, refetch, setLoading)
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if (loading) {
    return <LoadingSpinnerCircle></LoadingSpinnerCircle>
  }

  // const handlePayConStat = async (id, payStat) => {
  //   setLoading(true)


  //   if (payStat === "Unpaid") {
  //     setLoading(false)
  //     return toast.error("Participant Didn't Pay Yet")
  //   }

  //   else {
  //     try{
  //       const payCon1 = await axiosSecure.put(`/regCamps_default/${id}`, {
  //         payConStat: "Confirmed",
  //       })

  //       const payCon2 = await axiosSecure.put(`/paymentInfo_up/${id}`, {
  //         payConStat: "Confirmed",
  //       })
  //       console.log( payCon2)
  //       // console.log(payCon1)
  //       refetch()
  //       setLoading(false)
  //     }
  //     catch(err){
  //       console.log(err)
  //       setLoading(false)
  //     }

  //   }


  // }

  const handlePayConStat = async (id, payStat) => {
    setLoading(true);

    if (payStat === "Unpaid") {
      setLoading(false);
      return toast.error("Participant Didn't Pay Yet");
    }

    try {
      // Perform both PUT requests concurrently
      const [payCon1, payCon2] = await Promise.all([
        axiosSecure.put(`/regCamps_default/${id}`, { payConStat: "Confirmed" }),
        axiosSecure.put(`/paymentInfo_up/${id}`, { payConStat: "Confirmed" })
      ]);

      // console.log(payCon1);
      // console.log(payCon2);
      toast.success("The camp has been confirmed")
      // Refetch data to reflect changes
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while updating the payment status.");
    } finally {
      setLoading(false);
    }
  };



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
                <th>Ser</th>
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
                regCamps?.map((item, i) => <tr key={item._id} className='hover:bg-[#dab9b93b] border-b text-center'>
                  <th>{i + 1}.</th>
                  <th>{item.nameOfParticipant}</th>
                  <td>{item.title}</td>
                  <td className='flex gap-2 p-1 items-center justify-center'><HiOutlineCurrencyBangladeshi />{item.campFee}</td>
                  <td>{item?.payStat}</td>
                  <td>
                    <Button
                      onClick={() => handlePayConStat(item._id, item?.payStat)}
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
