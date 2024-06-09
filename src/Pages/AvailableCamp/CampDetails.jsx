import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAxiosCommon } from '../../Hooks/useAxiosCommon'
import { Helmet } from 'react-helmet-async'
import { TbCurrencyTaka } from 'react-icons/tb'
import { LoadingSpinnerCircle } from '../../Components/LoadingSpinnerCircle'
import { Button } from '@material-tailwind/react'
import { FaTentArrowDownToLine } from "react-icons/fa6";
import { GrDocumentUpdate } from "react-icons/gr";
import JoinCampModa from '../../Components/Modals/JoinCampModa'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure'


export const CampDetails = () => {
    const { id } = useParams()
    // console.log(id)

    const axiosSecure = useAxiosSecure()

    const [isJoinCampModalOpen, setIsJoinCampModalOpen] = useState(false)

    const { data: campDetails = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['campDetails'],
        queryFn: () => campData(),
        
    })
    // console.log(data)

    const campData = async () => {
        const { data } = await axiosSecure(`/camps/${id}`);
        return data
    }

    // console.log(camp)

    if (isLoading) {
        return <LoadingSpinnerCircle></LoadingSpinnerCircle>
    }

    const { _id, title, campFee, startDate, endDate, startTime, endTime, loc, healtCareProf, participantCount, email, user_name, description, thumbnail } = campDetails;

    return (
        <div className='mt-5'>
            <Helmet>
                <title>Health Bridge | Camp Details</title>
            </Helmet>
            <div className="flex lg:flex-row flex-col  card card-compact lg:w-full w-10/12 mx-auto bg-base-100 shadow-xl rounded-2xl cursor-text  h-full border border-blue-200 mb-5 space-y-5">
                <div data-aos="fade-up" data-aos-duration="1000" className='lg:w-8/12'>
                    <figure><img className='md:max-h-[calc(100vh-100px)] max-h-[calc(100vh-150px)]  
                    w-full rounded-2xl p-5' src={thumbnail} alt="" /></figure>
                </div>

                <div data-aos="fade-left" data-aos-duration="1000" className="card-body lg:w-4/12 p-2 flex flex-col space-y-5">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6 md:text-2xl text-xl">
                        <a>
                            <h3 className="font-bold uppercase text-gray-900">
                                {title}
                            </h3>
                            <h3 className="font-bold uppercase text-gray-900 flex gap-2 items-center">
                                <TbCurrencyTaka />{campFee}
                            </h3>
                        </a>

                        <div className='space-y-2'>
                            <p className="mt-2 line-clamp-3 md:text-lg text-base text-gray-700">
                                Location: {loc}
                            </p>
                            <p className="mt-2 line-clamp-3 md:text-lg text-base text-gray-700">
                                Start Date: {startDate}, End Date: {endDate}
                            </p>
                            <p className="mt-2 line-clamp-3 md:text-lg text-base text-gray-700">
                                Start Time: {startTime}, End Time: {endTime}
                            </p>

                            <p className="mt-2 line-clamp-3 md:text-lg text-base text-gray-700">
                                Health Care Professional: {healtCareProf}
                            </p>
                            <p className="mt-2 line-clamp-3 md:text-lg text-base text-gray-700">
                                Participated: {participantCount} {participantCount > 1 ? "persons" : "person"}
                            </p>

                        </div>
                    </div>


                    <div className='flex items-center p-2 justify-center gap-5 w-full'>


                        <Button onClick={() => setIsJoinCampModalOpen(true)} className='btn btn-outline text-white hover:bg-accent bg-third font-bold hover:scale-105 hover:duration-300 flex items-center gap-2 justify-center'><FaTentArrowDownToLine /> Join Camp</Button>

                        {/* <Link to={`/update/${_id}`}>
                            <Button className='btn btn-outline text-white hover:bg-accent bg-third font-bold hover:scale-105 hover:duration-300 flex items-center gap-2 justify-center'> <GrDocumentUpdate />Update</Button>
                        </Link> */}

                        <JoinCampModa
                            isOpen={isJoinCampModalOpen}
                            setIsOpen={setIsJoinCampModalOpen}
                            camp={campDetails}
                            refetch={refetch}
                        ></JoinCampModa>


                    </div>
                </div>

            </div>
            <div>
                <p className="mt-2 line-clamp-3 md:text-lg text-base text-black text-justify">
                    <strong> Description:</strong> {description}
                </p>
            </div>
        </div>
    )
}
