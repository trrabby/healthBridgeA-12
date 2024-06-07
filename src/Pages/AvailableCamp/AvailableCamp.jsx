import React, { useState } from 'react'

import { LoadingSpinnerCircle } from '../../Components/LoadingSpinnerCircle'
import { useAllCamps } from '../../Hooks/useAllCamps';
import { SectionHead } from '../../Components/SectionHead';
import { Camp } from '../../Components/Camp';
import { Button } from '@headlessui/react';
import { useAxiosCommon } from '../../Hooks/useAxiosCommon';


export const AvailableCamp = () => {

  const { camps, isLoading, refetch } = useAllCamps();
  // console.log(camps)
  
  const [filter, setFilter] = useState(null)
  
  // console.log(filter)

  const axiosCommon=useAxiosCommon()
  // console.log(isLoading)

  if (isLoading) {
    return <LoadingSpinnerCircle></LoadingSpinnerCircle>
  }

  // console.log(camps)

  const handleTextSearch = async (e) => {
    const value = e.target.value
    // console.log(value)
    // setValue(value)

    if (value ==="") {
      return setFilter(null)
    }

    const { data } = await axiosCommon(`/camps-search/${value}`)
    setFilter(data)
    toast.success(`${data.length} ${data.length > 1 ? "Blogs" : "Blog"} found`)




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
      </div>

      <div className='grid grid-flow-row grid-cols-1 lg:grid-cols-2 justify-between gap-5 p-0 mb-10 lg:w-full w-10/12 mx-auto mt-5 '>
        { 
          filter? filter.map(camp => <Camp key={camp._id} camp={camp} refetch={refetch}></Camp>) :
          camps.map(camp => <Camp key={camp._id} camp={camp} refetch={refetch}></Camp>)
        }
      </div>
    </div>
  )
}
