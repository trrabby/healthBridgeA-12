import PropTypes from 'prop-types'
import { Fragment, useContext, useState } from 'react'
import {
    Dialog,
    Listbox,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,

} from '@headlessui/react'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineDown } from 'react-icons/ai'
import { TbCurrencyTaka } from 'react-icons/tb'
import { ContextApi } from '../../Providers/ContextProvider'
import { useForm } from 'react-hook-form'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { useMutation } from '@tanstack/react-query'
import { useAllCamps } from '../../Hooks/useAllCamps'

const JoinCampModa = ({ setIsOpen, isOpen, camp, refetch}) => {
    const { user } = useContext(ContextApi)
    const axiosSecure = useAxiosSecure()

    const { _id, title, campFee, startDate, endDate, startTime, endTime, loc, healtCareProf, participantCount, email, user_name, description, thumbnail } = camp;

    // console.log(_id)

    const { mutateAsync } = useMutation({
        mutationFn: async updateInfo => {
            const { data } = await axiosSecure.patch(
                `/campss/${_id}`,
                updateInfo
            )
            return data
        },
        onSuccess: data => {
            refetch()
            console.log(data)
        },
    })


    const handleParticipantCount = async () => {

        const updateData = {
            participantCount: parseInt(participantCount) + 1,
            // registerdBy: [user.email]
        };

        try {
            const data = await mutateAsync(updateData)
        }
        catch (err) {
            console.log(err)
        }
    }

    // console.log(user)
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()

    const onSubmit = async (modalData) => {

        const infoWithAddlModalData = {
            "regCampId": _id,
            "title": title,
            "campFee": parseFloat(campFee),
            "loc": loc,
            "healtCareProf": healtCareProf,
            "nameOfParticipant": user.displayName,
            "emailOfParticipant": user.email,
            "regTime": new Date(),
            "payStat": "Unpaid",
            "payConStat": "Pending",
            ...modalData,

        }

        // console.log(infoWithAddlModalData)

        try {
            const { data } = await axiosSecure.post('/regCamps', infoWithAddlModalData)
            if (data.insertedId) {
                // toast.success(`${title} Registered Successfully`)
                // navigate('/allBlogs');
                handleParticipantCount()
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `Successfully Registered to ${title}`,
                    showConfirmButton: true,
                    // timer: 2000
                });
                reset();
                setIsOpen(false);
            }

        }
        catch (err) {
            console.log(err)
        }

    }


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-50'
                onClose={() => setIsOpen(false)}
            >
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-in duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-out duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-100'
                        >
                            <DialogPanel className='w-auto h-auto rounded-2xl bg-white p-6 text-left shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium uppercase underline text-center leading-6 text-gray-900'
                                >
                                    Fill Up the fields to register
                                </DialogTitle>
                                <div className='mt-4 w-full'>
                                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>

                                        <h3 className="font-bold uppercase text-gray-900">
                                            Camp Name: {title}
                                        </h3>
                                        <h3 className="font-bold  text-gray-900 flex gap-2 items-center">
                                            Camp Fees: {campFee} tk only
                                        </h3>
                                        <h3 className="font-bold  text-gray-900 flex gap-2 items-center">
                                            Location: {loc}
                                        </h3>
                                        <h3 className="font-bold  text-gray-900 flex gap-2 items-center">
                                            Health Care Professional: {healtCareProf}
                                        </h3>
                                        <h3 className="font-bold  text-gray-900 flex gap-2 items-center">
                                            Participant Name: {user?.displayName}
                                        </h3>
                                        <h3 className="font-bold  text-gray-900 flex gap-2 items-center">
                                            Participant Email: {user?.email}
                                        </h3>
                                        <hr className='mt-16 ' />
                                        <div className='flex gap-2 pt-6'>
                                            <input className='border p-2 rounded-lg' type="number" placeholder='Insert Your Age' {...register("age", { required: true })} />

                                            {errors.age && <span className='text-red-600 text-xs'>This field is required</span>}

                                            <input className='border p-2 rounded-lg' type="number" placeholder='Insert Your Number' {...register("number", { required: true })} />
                                            {errors.number && <span className='text-red-600 text-xs'>This field is required</span>}
                                        </div>

                                        <div className='flex gap-2 justify-center items-center'>
                                            <input className='border p-2 rounded-lg' name='gender' value={"Male"} type="radio" {...register("gender", { required: true })} /><label htmlFor="gender">Male</label>

                                            <input className='border p-2 rounded-lg' name='gender' value={"Female"} type="radio" {...register("gender", { required: true })} /><label htmlFor="gender">Female</label>

                                            {errors.gender && <span className='text-red-600 text-xs'>This field is required</span>}
                                        </div>


                                        <div className='flex gap-2'>
                                            <input className='border p-2 rounded-lg w-full' type="text" placeholder='Emergency Contact' {...register("emergency_contact", { required: true })} />
                                            {errors.emergency_contact && <span className='text-red-600 text-xs'>This field is required</span>}
                                        </div>



                                        <div className='flex mt-2 justify-center gap-5'>
                                            <button
                                                type='submit'
                                                className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'

                                            >
                                                Register Camp
                                            </button>
                                            <button
                                                type='button'
                                                className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

JoinCampModa.propTypes = {
    user: PropTypes.object,
    modalHandler: PropTypes.func,
    setIsOpen: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default JoinCampModa
