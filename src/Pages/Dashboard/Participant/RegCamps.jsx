import React, { useContext, useState } from 'react';
import { ContextApi } from '../../../Providers/ContextProvider';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { SectionHead } from '../../../Components/SectionHead';
import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi2';
import { Button } from '@headlessui/react';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { BiErrorCircle } from "react-icons/bi";
import { handleDelete } from '../../../Components/utilities/handleDelete';
import ReviewModal from '../../../Components/Modals/ReviewModal';
import { LoadingSpinner } from '../../../Components/LoadingSpinner';
import { LoadingSpinnerCircle } from '../../../Components/LoadingSpinnerCircle';

export const RegCamps = () => {
    const [campModalOpen, setCampModalOpen] = useState(false);
    const [selectedCamp, setSelectedCamp] = useState(null);

    const { user } = useContext(ContextApi);
    const axiosSecure = useAxiosSecure();

    const { data: myCamps = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['regCampsData'],
        queryFn: () => myRegCampsData(),
    });

    const myRegCampsData = async () => {
        const { data } = await axiosSecure(`/myRegCamps/${user?.email}`);
        return data;
    };

    if(isLoading){
        return <LoadingSpinnerCircle></LoadingSpinnerCircle>
    }

    const handleFeedback = (e, item) => {
        e.stopPropagation();
        setSelectedCamp(item);
        setCampModalOpen(true);
    };

    return (
        <div>
            <SectionHead title={"All Registered Camps"}></SectionHead>
            <div>
                <table className="table-sm w-full text-center">
                    <thead className='underline text-center'>
                        <tr>
                            <th>Camp Name</th>
                            <th>Camp Fee</th>
                            <th>Participant Name</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCamps &&
                            myCamps.map((item, i) => (
                                <tr key={item._id} data-aos="fade-left" data-aos-duration="800" className='hover:bg-[#dab9b93b] border-b text-center'>
                                    <td>{item.title}</td>
                                    <td className='flex gap-2 p-1 items-center justify-center'><HiOutlineCurrencyBangladeshi />{item.campFee}</td>
                                    <th>{item.nameOfParticipant}</th>
                                    <td>{item?.payStat === "Paid" ? "Paid" :
                                        <Link to={`payPage/${item._id}`} className='text-accent font-extrabold p-1 px-3 rounded-lg hover:bg-accent duration-500 hover:text-white'>Pay</Link>}
                                    </td>
                                    <td><Button className={`p-1 px-3 rounded-lg duration-500`}>{item?.payConStat}</Button></td>
                                    <td>
                                        <button
                                            disabled={item?.payStat === "Paid"}
                                            onClick={() => handleDelete((`/regCamps/${item._id}`), refetch)}
                                            className={`border p-1 rounded-lg duration-700 ${item?.payStat === "Paid" ? "hover:bg-none text-black cursor-not-allowed" : "hover:bg-red-600 hover:text-white"}`}>
                                            {item?.payStat === "Paid" ? <BiErrorCircle /> : <RxCross2 />}
                                        </button>
                                    </td>
                                    <td>
                                        {item?.payConStat === "Confirmed" && item?.payStat === "Paid" ?
                                            <button
                                                onClick={(e) => handleFeedback(e, item)}
                                                className='text-accent font-extrabold p-1 px-3 rounded-lg hover:bg-accent duration-500 hover:text-white'>Feedback</button> :
                                            "N/A"
                                        }
                                    </td>

                                    {/* <td>
                                    {
                                        item?.payConStat === "Confirmed" && item?.payStat === "Paid" ?
                                            <Link
                                            to={`feedback/${item._id}`}
                                            className='text-accent font-extrabold p-1 px-3 rounded-lg hover:bg-accent duration-500 hover:text-white'>Feedback</Link> :
                                            "N/A"
                                    }
                                </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {selectedCamp && (
                <ReviewModal
                    isOpen={campModalOpen}
                    setIsOpen={setCampModalOpen}
                    camp={selectedCamp}
                    refetch={refetch}
                />
            )}
        </div>
    );
};
