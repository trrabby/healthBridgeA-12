import React, { useContext, useState } from 'react'
import { Form, useNavigate, useParams } from 'react-router-dom'
import { useAxiosSecure } from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { SectionHead } from '../../Components/SectionHead'
import { useAxiosCommon } from '../../Hooks/useAxiosCommon'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ContextApi } from '../../Providers/ContextProvider'
import { LoadingSpinnerCircle } from '../../Components/LoadingSpinnerCircle'
import { Button } from '@material-tailwind/react'
import { imgUpload } from '../../Components/utilities/handlePhoto'
import toast from 'react-hot-toast'
import { LoadingSpinner } from '../../Components/LoadingSpinner'

export const UpdateCamp = () => {

    const [photoPreview, setPhotoPreview] = useState(null)

    const { loading, setLoading } = useContext(ContextApi)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const axiosCommon = useAxiosCommon()

    const { id } = useParams()
    console.log(id)

    const { register, handleSubmit, reset, formState: { errors }, } = useForm()

    const { data: campUpdate, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['campUpdate'],
        queryFn: () => campData(),

    })
    console.log(campUpdate)

    const campData = async () => {
        try {
            const { data } = await axiosSecure(`/camps/${id}`);
            return data
        }
        catch (err) {
            console.log(err)
        }
    }


    const { title, campFee, startDate, endDate, startTime, endTime, loc, healtCareProf, participantCount, email, user_name, description, thumbnail } = campUpdate;



    if (loading) {
        <LoadingSpinnerCircle></LoadingSpinnerCircle>
    }
    // form upgradation

    const onSubmit = async (formInfo) => {
        setLoading(true)
        if (formInfo.img[0]) {
            formInfo.img = await imgUpload(formInfo?.img[0])
        }

        console.log(formInfo)

        try {
            const { data } = await axiosSecure.patch(`/campss/${id}`, formInfo)

            if (data.modifiedCount > 0) {
                toast.success('Item Updated successfully')
                navigate(`/campDetails/${id}`);
                setPhotoPreview(null);
                setLoading(false)
            }
            else if (data.matchedCount > 0) {
                toast.error("You didn't change anything")
                setLoading(false)
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const handlePhotoPreview = async (e) => {
        // console.log(e.target.files[0])
        const formData = new FormData();
        formData.append('image', e.target.files[0])

        // console.log(formData)

        try {
            // photo upload to imgbb
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_aip_imgbb}`, formData)

            const photoPreview = data.data.display_url
            // console.log(photoPreview)
            setPhotoPreview(photoPreview)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <SectionHead
                title={'Update Camp'}
            ></SectionHead>
            <div>
                <div className="lg:w-full w-10/12 mx-auto lg:min-h-[calc(100vh-170px)] bg-cover bg-center  rounded-lg mb-5 flex flex-col items-start justify-center text-center border">

                    <div className='lg:w-11/12 w-full mx-auto flex gap-2 lg:flex-row-reverse items-start justify-center  text-black  p-5  rounded-xl space-y-2 font-medium md:my-5'>

                        
                        {
                            photoPreview ? <div className={`w-6/12 lg:flex flex-col hidden`}>
                                <p className='w-full text-black pb-5'>
                                    <span className='underline rounded-lg p-3'>Image Preview </span> </p>
                                <img className='rounded-lg' src={photoPreview} alt="" />
                            </div>

                                :

                                <div className={`w-6/12 lg:flex flex-col hidden`}>
                                    <p className='w-full text-black pb-5'>
                                        <span className='underline rounded-lg p-3'>Image Preview </span> </p>
                                    <img className='rounded-lg' src={thumbnail || "https://i.ibb.co/vw4xsDM/design-application-flat-character-illustration-203633-2106.jpg"} alt="No Photo Added Yet" />
                                </div>
                        }
                        <form onSubmit={handleSubmit(onSubmit)} className='mx-auto flex flex-col gap-5 lg:w-6/12 w-full '>

                            <div>
                                {/* <h1 className='font-bold'>Add A Camp</h1> */}
                            </div>
                            <div className='flex lg:flex-row flex-col gap-5 w-full campForm'>
                                <div className='w-full flex flex-col gap-3'>

                                    <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 42 42" id="pen"><path fill="#231f20" d="M37.28 4.72a5.52 5.52 0 0 0-7.78 0L5.73 28.49a1.56 1.56 0 0 0-.42.84L4.3 36a1.5 1.5 0 0 0 1.48 1.73h.23l6.66-1a1.56 1.56 0 0 0 .84-.42L37.28 12.5a5.52 5.52 0 0 0 0-7.78ZM11.74 33.8l-4.17.63.63-4.17 19.52-19.51 3.53 3.53Zm23.42-23.42-2.49 2.49-3.54-3.54 2.49-2.49a2.5 2.5 0 1 1 3.54 3.54Z"></path></svg>
                                        <input defaultValue={title} className='text-black w-full' type="text" placeholder='Camp Title' name='title' {...register("title", { required: true })} />
                                    </label>
                                    {errors.title && <span className='text-red-600 text-xs'>This field is required</span>}

                                    <form onInput={handlePhotoPreview} className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow	1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="image"><path d="M13.5,6C12.7,6,12,6.7,12,7.5S12.7,9,13.5,9S15,8.3,15,7.5S14.3,6,13.5,6z M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14
                    c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M20,13.9L18.1,12c-1.2-1.1-3.1-1.1-4.2,0L13,12.9L10.1,10c-1.2-1.1-3.1-1.1-4.2,0L4,11.9V5
                    c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V13.9z"></path></svg>
                                        <input defaultValue={thumbnail} className='text-black w-full' type="file" name='img' placeholder="Thumbnail Image"
                                            {...register("img", { required: false })} />
                                    </form>
                                    {errors.img && <span className='text-red-600 text-xs'>This field is required</span>}

                                    <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 42 42" id="pen"><path fill="#231f20" d="M37.28 4.72a5.52 5.52 0 0 0-7.78 0L5.73 28.49a1.56 1.56 0 0 0-.42.84L4.3 36a1.5 1.5 0 0 0 1.48 1.73h.23l6.66-1a1.56 1.56 0 0 0 .84-.42L37.28 12.5a5.52 5.52 0 0 0 0-7.78ZM11.74 33.8l-4.17.63.63-4.17 19.52-19.51 3.53 3.53Zm23.42-23.42-2.49 2.49-3.54-3.54 2.49-2.49a2.5 2.5 0 1 1 3.54 3.54Z"></path></svg>
                                        <input defaultValue={campFee} className='text-black w-full' type="number" placeholder='Camp Fee' name='campFee' {...register("campFee", { required: true })} />
                                    </label>
                                    {errors.campFee && <span className='text-red-600 text-xs'>This field is required</span>}

                                    <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 42 42" id="pen"><path fill="#231f20" d="M37.28 4.72a5.52 5.52 0 0 0-7.78 0L5.73 28.49a1.56 1.56 0 0 0-.42.84L4.3 36a1.5 1.5 0 0 0 1.48 1.73h.23l6.66-1a1.56 1.56 0 0 0 .84-.42L37.28 12.5a5.52 5.52 0 0 0 0-7.78ZM11.74 33.8l-4.17.63.63-4.17 19.52-19.51 3.53 3.53Zm23.42-23.42-2.49 2.49-3.54-3.54 2.49-2.49a2.5 2.5 0 1 1 3.54 3.54Z"></path></svg>
                                        <span className='text-nowrap'>Start-Date</span>
                                        <input defaultValue={startDate} className='text-black w-full' type="date" placeholder='Date' name='startDate' {...register("startDate", { required: true })} />
                                        {errors.startDate && <span className='text-red-600 text-xs'>This field is required</span>}
                                        <span className='text-nowrap'>End-Date</span>
                                        <input defaultValue={endDate} className='text-black w-full' type="date" placeholder='Date' name='endDate' {...register("endDate", { required: true })} />
                                        {errors.endDate && <span className='text-red-600 text-xs'>This field is required</span>}
                                    </label>

                                    <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 42 42" id="pen"><path fill="#231f20" d="M37.28 4.72a5.52 5.52 0 0 0-7.78 0L5.73 28.49a1.56 1.56 0 0 0-.42.84L4.3 36a1.5 1.5 0 0 0 1.48 1.73h.23l6.66-1a1.56 1.56 0 0 0 .84-.42L37.28 12.5a5.52 5.52 0 0 0 0-7.78ZM11.74 33.8l-4.17.63.63-4.17 19.52-19.51 3.53 3.53Zm23.42-23.42-2.49 2.49-3.54-3.54 2.49-2.49a2.5 2.5 0 1 1 3.54 3.54Z"></path></svg>
                                        <span className='text-nowrap'>Start-Time</span>
                                        <input defaultValue={startTime} className='text-black w-full' type="time" placeholder='Time' name='startTime' {...register("startTime", { required: true })} />
                                        {errors.startTime && <span className='text-red-600 text-xs'>This field is required</span>}
                                        <span className='text-nowrap'>End-Time</span>
                                        <input defaultValue={endTime} className='text-black w-full' type="time" placeholder='Time' name='endTime' {...register("endTime", { required: true })} />
                                        {errors.endTime && <span className='text-red-600 text-xs'>This field is required</span>}
                                    </label>


                                    <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 42 42" id="pen"><path fill="#231f20" d="M37.28 4.72a5.52 5.52 0 0 0-7.78 0L5.73 28.49a1.56 1.56 0 0 0-.42.84L4.3 36a1.5 1.5 0 0 0 1.48 1.73h.23l6.66-1a1.56 1.56 0 0 0 .84-.42L37.28 12.5a5.52 5.52 0 0 0 0-7.78ZM11.74 33.8l-4.17.63.63-4.17 19.52-19.51 3.53 3.53Zm23.42-23.42-2.49 2.49-3.54-3.54 2.49-2.49a2.5 2.5 0 1 1 3.54 3.54Z"></path></svg>
                                        <input defaultValue={loc} className='text-black w-full' type="text" placeholder='Location' name='loc' {...register("loc", { required: true })} />
                                    </label>
                                    {errors.loc && <span className='text-red-600 text-xs'>This field is required</span>}

                                    <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 42 42" id="pen"><path fill="#231f20" d="M37.28 4.72a5.52 5.52 0 0 0-7.78 0L5.73 28.49a1.56 1.56 0 0 0-.42.84L4.3 36a1.5 1.5 0 0 0 1.48 1.73h.23l6.66-1a1.56 1.56 0 0 0 .84-.42L37.28 12.5a5.52 5.52 0 0 0 0-7.78ZM11.74 33.8l-4.17.63.63-4.17 19.52-19.51 3.53 3.53Zm23.42-23.42-2.49 2.49-3.54-3.54 2.49-2.49a2.5 2.5 0 1 1 3.54 3.54Z"></path></svg>
                                        <input defaultValue={healtCareProf} className='text-black w-full' type="text" placeholder='Health Care Professional Name' name='healtCareProf' {...register("healtCareProf", { required: true })} />
                                    </label>
                                    {errors.healtCareProf && <span className='text-red-600 text-xs'>This field is required</span>}

                                    <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 42 42" id="pen"><path fill="#231f20" d="M37.28 4.72a5.52 5.52 0 0 0-7.78 0L5.73 28.49a1.56 1.56 0 0 0-.42.84L4.3 36a1.5 1.5 0 0 0 1.48 1.73h.23l6.66-1a1.56 1.56 0 0 0 .84-.42L37.28 12.5a5.52 5.52 0 0 0 0-7.78ZM11.74 33.8l-4.17.63.63-4.17 19.52-19.51 3.53 3.53Zm23.42-23.42-2.49 2.49-3.54-3.54 2.49-2.49a2.5 2.5 0 1 1 3.54 3.54Z"></path></svg>
                                        <span className='text-nowrap'>Participant Counts</span>
                                        <input defaultValue={participantCount} className='text-black w-full' type="number" placeholder='Participant Count' name='participantCount' {...register("participantCount", { required: true })} />
                                    </label>
                                    {errors.participantCount && <span className='text-red-600 text-xs'>This field is required</span>}

                                    <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 42 42" id="pen"><path fill="#231f20" d="M37.28 4.72a5.52 5.52 0 0 0-7.78 0L5.73 28.49a1.56 1.56 0 0 0-.42.84L4.3 36a1.5 1.5 0 0 0 1.48 1.73h.23l6.66-1a1.56 1.56 0 0 0 .84-.42L37.28 12.5a5.52 5.52 0 0 0 0-7.78ZM11.74 33.8l-4.17.63.63-4.17 19.52-19.51 3.53 3.53Zm23.42-23.42-2.49 2.49-3.54-3.54 2.49-2.49a2.5 2.5 0 1 1 3.54 3.54Z"></path></svg>
                                        <input className='text-black w-full' type="email" defaultValue={email} placeholder='Email' name='email' {...register("email", { required: true })} />
                                    </label>
                                    {errors.email && <span className='text-red-600 text-xs'>This field is required</span>}

                                    <label className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow 1s">
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 42 42" id="pen"><path fill="#231f20" d="M37.28 4.72a5.52 5.52 0 0 0-7.78 0L5.73 28.49a1.56 1.56 0 0 0-.42.84L4.3 36a1.5 1.5 0 0 0 1.48 1.73h.23l6.66-1a1.56 1.56 0 0 0 .84-.42L37.28 12.5a5.52 5.52 0 0 0 0-7.78ZM11.74 33.8l-4.17.63.63-4.17 19.52-19.51 3.53 3.53Zm23.42-23.42-2.49 2.49-3.54-3.54 2.49-2.49a2.5 2.5 0 1 1 3.54 3.54Z"></path></svg>
                                        <input className='text-black w-full' type="text" defaultValue={user_name} placeholder='User Name' name='user_name' {...register("user_name", { required: true })} />
                                    </label>
                                    {errors.user_name && <span className='text-red-600 text-xs'>This field is required</span>}

                                </div>


                            </div>

                            <textarea defaultValue={description} className="input input-bordered flex items-center gap-2 animate__animated animate__flipInX animate__slow	1s p-2 px-4" placeholder='Description' name="description" rows="4" cols="50" {...register("description", { required: true })}>

                            </textarea>
                            {errors.description && <span className='text-red-600 text-xs'>This field is required</span>}


                            <Button className=' text-white font-extrabold bg-accent hover:bg-primary hover:text-black' type='submit'>Update</Button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
