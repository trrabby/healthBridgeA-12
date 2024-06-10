import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { MdDeleteOutline } from 'react-icons/md'

import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { TbCoinTakaFilled, TbCurrencyTaka } from "react-icons/tb";
import { ContextApi, ContextProvider } from '../Providers/ContextProvider'
import { useQuery } from '@tanstack/react-query'
import { useAxiosSecure } from '../Hooks/useAxiosSecure'


export const Camp = ({ camp, refetch }) => {

    const axiosSecure = useAxiosSecure()
    const { _id, title, campFee, startDate, endDate, startTime, endTime, loc, healtCareProf, participantCount, email, user_name, description, thumbnail } = camp

    return (
        <div data-aos="fade-down" data-aos-duration="1000">
            <article className="flex flex-col md:flex-row bg-white transition hover:shadow-xl cursor-text">
                <div className="basis-56">
                    <img
                        alt=""
                        src={thumbnail}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                        <a>
                            <h3 className="font-bold uppercase text-gray-900">
                                {title}
                            </h3>
                            <h3 className="font-bold uppercase text-gray-900 flex gap-2 items-center">
                                <TbCurrencyTaka />{campFee}
                            </h3>
                        </a>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                            Location: {loc}
                        </p>
                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                            Start Date: {startDate}, End Date: {endDate}
                        </p>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                            Health Care Professional: {healtCareProf}
                        </p>
                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                            Participated: {participantCount} {participantCount > 1 ? "persons" : "person"}
                        </p>
                    </div>



                    <div className="flex items-end justify-around pb-5">
                        <Link
                            onClick={window.scroll(0, 0)}
                            to={`/campDetails/${_id}`}
                            className="bg-accent px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-primary hover:text-black duration-700"
                        >
                            Details
                        </Link>

                        
                    </div>
                </div>
            </article>
        </div>
    )
}
