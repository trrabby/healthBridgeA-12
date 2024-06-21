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
import { useMyRegCampCount } from '../../../Hooks/useMyRegCampCount';

export const RegCamps = () => {

    const { user, setLoading, loading } = useContext(ContextApi);
    const axiosSecure = useAxiosSecure();
    const [campModalOpen, setCampModalOpen] = useState(false);
    const [selectedCamp, setSelectedCamp] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const { myRegCampsCount } = useMyRegCampCount()
    // console.log(myRegCampsCount)
    const itemPerPage = 10;
    const numberOfPage = Math.ceil(myRegCampsCount / itemPerPage)
    // console.log(numberOfPage)
    const pages = [...Array(numberOfPage).keys()];
    // console.log(pages)


    const { data: myCamps = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['regCampsData', currentPage],
        queryFn: () => myRegCampsData(),
    });
    // console.log(myCamps)

    const myRegCampsData = async () => {
        const { data } = await axiosSecure(`/myRegCamps/${user?.email}?page=${currentPage}&&size=${itemPerPage}`);
        return data;
    };

    if (isLoading || loading) {
        return <LoadingSpinnerCircle></LoadingSpinnerCircle>
    }

    const handleFeedback = (e, item) => {
        e.stopPropagation();
        setSelectedCamp(item);
        setCampModalOpen(true);
    };


    // console.log(pages)
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

    return (
        <div>
            <SectionHead title={"All Registered Camps"}></SectionHead>
            <div className='flex flex-col justify-between gap-4 overflow-x-auto'>
                <table className="table-sm w-full text-center overflow-x-auto">
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
                                <tr key={item._id} className='hover:bg-[#dab9b93b] border-b text-center'>
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
                                            onClick={() => handleDelete((`/regCamps/${item._id}`), refetch, setLoading)}
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
                <div className='text-center bg-third backdrop-blur-0 p-2 text-white flex gap-2 justify-center items-center' >
                    <button
                        onClick={handlePrev} className='bg-white text-black hover:bg-fourth duration-500 mr-3 px-3 rounded-full'>Prev</button>
                    {
                        pages && pages.map((page, i) =>
                            <button
                                key={i}
                                onClick={() => setCurrentPage(page)}
                                className={`bg-white text-black hover:bg-fourth duration-500 mr-3 px-2 rounded-full ${currentPage === page && 'bg-fourth text-white'}`}
                            >{page + 1}</button>)
                    }
                    <button
                        onClick={handleNext}
                        className='bg-white text-black hover:bg-fourth duration-500 mr-3 px-3 rounded-full'>Next</button>
                </div>
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
