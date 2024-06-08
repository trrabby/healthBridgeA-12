import React, { useEffect, useState } from 'react'

import { LoadingSpinnerCircle } from '../../Components/LoadingSpinnerCircle'
import { useAllCamps } from '../../Hooks/useAllCamps';
import { SectionHead } from '../../Components/SectionHead';
import { Camp } from '../../Components/Camp';
import { Button } from '@headlessui/react';
import { useAxiosCommon } from '../../Hooks/useAxiosCommon';
import toast from 'react-hot-toast';


export const AvailableCamp = () => {

  const { camps , isLoading, refetch } = useAllCamps();
 

  const [campsData, setCampsData] = useState([])
  const [filter, setFilter] = useState(null)

  console.log(campsData)

  useEffect(()=>{
    setCampsData(camps)
  },[camps])

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
    toast.success(`${data.length} ${data.length > 1 ? "Blogs" : "Blog"} found`)

  }

  const handleFrontSel = async (e) => {
    const value = e.target.value
    console.log(value)

    
    

    if (value === "Random") {
      return setCampsData(camps)
    }

    else if (value === "Most_Registered") {
      const {data} = await axiosCommon('/mostReg')
      setCampsData(data)
    }   

    else if (value === "Camp_Fees") {
      const {data} = await axiosCommon('/camp_fee')
      setCampsData(data)
    }  

    else if (value === "Alphabetical_Order") {
      const {data} = await axiosCommon('/Alphabetical_Order')
      setCampsData(data)
    }   

  }
  return (
    <div>
      <SectionHead
        title={'Our Camps'}
        para={'Our medical camps deliver essential healthcare, offering check-ups and health education to enhance community wellness and preventive care.'}
      ></SectionHead>

      <div className='flex items-center justify-center bg-accent p-5 rounded-lg gap-2'>
        <input onKeyUp={handleTextSearch} type="text" name="searchField" className=' p-2 px-4 w-4/12 rounded-lg' placeholder='Search Your Desired Camp Here' />

        <Button

          className="bg-primary p-2 rounded-xl font-bold hover:scale-105 duration-500 hover:bg-third hover:text-white">Search</Button>

        <select name="selectionTab" onChange={handleFrontSel} className='w-full h-full border-none bg-none outline-none text-sm lg:text-base' placeholder="Select">
          <option value="" disabled selected>Sort By</option>
          <option value="Random">Random</option>
          <option value="Most_Registered">Most Registered</option>
          <option value="Camp_Fees">Camp Fees</option>
          <option value="Alphabetical_Order">Alphabetical Order</option>

        </select>
      </div>

      <div className='grid grid-flow-row grid-cols-1 lg:grid-cols-2 justify-between gap-5 p-0 mb-10 lg:w-full w-10/12 mx-auto mt-5 '>
        {
          filter ? filter.map(camp => <Camp key={camp._id} camp={camp} refetch={refetch}></Camp>) :
            campsData?.map(camp => <Camp key={camp._id} camp={camp} refetch={refetch}></Camp>)
        }
      </div>
    </div>
  )
}
