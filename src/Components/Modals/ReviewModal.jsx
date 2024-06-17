import PropTypes from 'prop-types'
import { Fragment, useContext, useState } from 'react'
import {
    Dialog,
    Transition,
} from '@headlessui/react'
import { ContextApi } from '../../Providers/ContextProvider'
import { useForm } from 'react-hook-form'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { Rating } from "@material-tailwind/react";
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const ReviewModal = ({ setIsOpen, isOpen, camp, refetch }) => {
    const [rated, setRated] = useState(4);
    const { user } = useContext(ContextApi)
    const axiosSecure = useAxiosSecure()
   

    const { title, loc, healtCareProf } = camp


    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = async (modalData) => {
        
        const infoWithAddlModalData = {
            "title": title,
            "loc": loc,
            "healtCareProf": healtCareProf,
            "feedbackGiverName": user.displayName,
            "feedbackGiverEmail": user.email,
            "feedbackGiverPhoto": user.photoURL,
            "regTime": new Date(),
            "rating" : rated,
            ...modalData,
        }
        // console.log(infoWithAddlModalData)
        try {
            const { data } = await axiosSecure.post('/feedback', infoWithAddlModalData)
            if (data.insertedId) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `Thanks For Your Feedback`,
                    showConfirmButton: true,
                })
                reset()
                setIsOpen(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-50'
                onClose={() => {setIsOpen(false); reset()}}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-in duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-out duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-100'
                        >
                            <Dialog.Panel className='w-auto h-auto rounded-2xl bg-white p-6 text-left shadow-xl transition-all' onClick={e => e.stopPropagation()}>
                                <Dialog.Title
                                    as='h3'
                                    className='text-lg font-bold uppercase underline text-center leading-6 text-gray-900 px-5'
                                >
                                    How Was Your {title} Experience?
                                </Dialog.Title>
                                <div className='mt-4 w-full'>

                                    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col items-center justify-center gap-2" >
                                        <label className='flex items-center justify-center gap-4'>
                                            {/* <span>Rate Us</span> */}
                                            <Rating onChange={(value) => setRated(value)} value={0} />
                                        </label>
                                        <textarea placeholder=" Write Your Feedback Here..." className='border border-accent rounded-lg h-40 w-10/12 p-5' name="ratingText" id=""
                                            {...register("ratingText", { required: true })}
                                        ></textarea>

                                        {errors.ratingText && <span className='text-red-600 text-xs'>This field is required</span>}

                                        <div className='flex gap-4 items-center justify-evenly'>

                                            <button className='text-accent font-extrabold px-4 py-2 rounded-lg hover:bg-accent duration-500 hover:text-white' type='submit'>Submit</button>

                                            <button
                                                type='button'
                                                className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm text-red-900 hover:bg-red-500 hover:text-white font-bold duration-300'
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Cancel
                                            </button>

                                            </div>

                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

ReviewModal.propTypes = {
    setIsOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    camp: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
}

export default ReviewModal
