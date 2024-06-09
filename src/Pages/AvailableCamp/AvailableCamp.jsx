import React, { useEffect, useState } from 'react'

import { LoadingSpinnerCircle } from '../../Components/LoadingSpinnerCircle'
import { useAllCamps } from '../../Hooks/useAllCamps';
import { SectionHead } from '../../Components/SectionHead';
import { Camp } from '../../Components/Camp';
import { Button } from '@headlessui/react';
import { useAxiosCommon } from '../../Hooks/useAxiosCommon';
import toast from 'react-hot-toast';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { IoGrid } from "react-icons/io5";


export const AvailableCamp = () => {

  const { camps, isLoading, refetch } = useAllCamps();


  const [campsData, setCampsData] = useState([])
  const [filter, setFilter] = useState(null)
  const [toggle, setToggle] = useState(false)

  // console.log(camps, campsData)

  useEffect(() => {
    setCampsData(camps)
  }, [camps])

  const axiosCommon = useAxiosCommon()
  // console.log(isLoading)

  if (isLoading) {
    return <LoadingSpinnerCircle></LoadingSpinnerCircle>
  }

  // console.log(camps)

  const handleTextSearch = async (e) => {
    const value = e.target.value
    // console.log(value)
    // setValue(value)

    if (value === "") {
      return setFilter(null)
    }

    const { data } = await axiosCommon(`/camps-search/${value}`)
    setFilter(data)
    toast.success(`${data.length} ${data.length > 1 ? "Camps" : "Camp"} found`)

  }

  const handleFrontSel = async (e) => {
    const value = e.target.value
    // console.log(value)

    if (value === "Random") {
      return setCampsData(camps)
    }

    else if (value === "Most_Registered") {
      const { data } = await axiosCommon('/mostReg')
      setCampsData(data)
    }

    else if (value === "Camp_Fees") {
      const { data } = await axiosCommon('/camp_fee')
      setCampsData(data)
    }

    else if (value === "Alphabetical_Order") {
      const { data } = await axiosCommon('/Alphabetical_Order')
      setCampsData(data)
    }

  }

  const handleToggle = () => {
    setToggle(!toggle)
  }
  return (
    <div>
      <SectionHead
        title={'Our Camps'}
        para={'Our medical camps deliver essential healthcare, offering check-ups and health education to enhance community wellness and preventive care.'}
      ></SectionHead>

      <div className='flex items-center justify-center bg-accent p-5 rounded-lg gap-2'>
        <input onKeyUp={handleTextSearch} type="text" name="searchField" className=' p-2 px-4 w-3/12 rounded-lg' placeholder='Search Your Desired Camp Here' />

        <select name="selectionTab" onChange={handleFrontSel} className='w-3/12 h-full bg-none outline-none text-sm lg:text-base p-2 rounded-lg bg-accent border border-third text-white hover:bg-third duration-500 hover:cursor-pointer text-center' placeholder="Select">
          <option value="" disabled selected>Sort By</option>
          <option value="Random">Random</option>
          <option value="Most_Registered">Most Registered</option>
          <option value="Camp_Fees">Camp Fees</option>
          <option value="Alphabetical_Order">Alphabetical Order</option>

        </select>

        <Button onClick={handleToggle} className="bg-primary p-2 rounded-xl font-bold hover:scale-105 duration-500 hover:bg-third hover:text-white">
          {
            toggle ? <BsFillGrid3X3GapFill /> : <IoGrid />
          }

        </Button>
      </div>

      <div className={`grid grid-flow-row grid-cols-1 ${toggle ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} justify-between gap-5 p-0 mb-10 lg:w-full w-10/12 mx-auto mt-5 `}>
        {
          filter ? filter.map(camp => <Camp key={camp._id} camp={camp} refetch={refetch}></Camp>) :
            campsData?.map(camp => <Camp key={camp._id} camp={camp} refetch={refetch}></Camp>)
        }
      </div>
    </div>
  )
}
