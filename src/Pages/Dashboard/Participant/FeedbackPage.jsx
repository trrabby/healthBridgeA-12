import React from 'react'
import { SectionHead } from '../../../Components/SectionHead'
import { Rating } from "@material-tailwind/react";
import { Label } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinnerCircle } from '../../../Components/LoadingSpinnerCircle';

export const FeedbackPage = () => {

    const {id} = useParams()

    const axiosSecure = useAxiosSecure()

  const { data: campDetailsforReview = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['campDetailsInRating'],
    queryFn: () => campData(),

  })
  // console.log(data)

  const campData = async () => {
    const { data } = await axiosSecure(`/regCamps_default/${id}`);
    
    return data
  }

  // console.log(camp)

  if (isLoading) {
    return <LoadingSpinnerCircle></LoadingSpinnerCircle>
  }

  const { _id, title, campFee, startDate, endDate, startTime, endTime, loc, healtCareProf, participantCount, email, user_name, description, thumbnail } = campDetailsforReview;


    const [rated, setRated] = React.useState(4);

    const handleRating = (e) => {
        e.preventDefault()
        const form = e.target
        const textarea = form.ratingText.value
        console.log(rated, textarea)
    }
    return (
        <div>
            <SectionHead
                title={"How Was Your Experience?"}
                para={"Rate Our Camp. We will consider your comment professionally"}
            ></SectionHead>

            <div>

                
                <form className=" flex flex-col items-center justify-center gap-2" onSubmit={handleRating} >
                    <label className='flex items-center justify-center gap-4'>
                        {/* <span>Rate Us</span> */}
                        <Rating onChange={(value) => setRated(value)} value={0} />
                    </label>
                    <textarea placeholder=" Write Your Comment Here" className='border h-40 w-8/12 p-5' name="ratingText" id=""></textarea>
                    <button className='text-accent font-extrabold p-1 px-3 rounded-lg hover:bg-accent duration-500 hover:text-white' type='submit'>Submit</button>
                </form>

            </div>
        </div>
    )
}


