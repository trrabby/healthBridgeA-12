import React, { useContext } from 'react'
import { ContextApi } from '../../Providers/ContextProvider'
import { useAdminRole } from '../../Hooks/useAdminRole'
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from 'react-icons/md';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import { imgUpload } from '../../Components/utilities/handlePhoto';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../../Components/LoadingSpinner';

export const MyProfile = () => {
  const { user, setUser, loading, setLoading, updateUserInfo } = useContext(ContextApi)
  // console.log(user)
  const userRole = useAdminRole()
  // console.log(userRole)
  const { register, handleSubmit, reset, formState: { errors }, } = useForm()

  const navigate = useNavigate()


  const onSubmit = async (updateInfo) => {
    updateInfo.PhotoURL = imgUpload(updateInfo.PhotoURL[0])
    // console.log(updateInfo)
    setLoading(true)
    const name = updateInfo.name
    const PhotoURL = await updateInfo.PhotoURL
    // console.log(PhotoURL)
      if(loading){
        return LoadingSpinner
      }
    try {

      await updateUserInfo(name, PhotoURL)
      await setUser({ ...user, photoURL: PhotoURL, displayName: name })
      toast.success('Profile Updated Successfully')
      setLoading(false)
      reset();
      navigate(location?.state ? location.state : "/");
    }

    catch (error) {
      setLoading(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      return toast.error('Profile Update Unsuccessfull')
    };
  }


  return (
    <div>
      <div className='bg-[url(https://i.ibb.co/L9LCF3p/kenrick-mills-rfe-PWka7-VPU-unsplash-1.jpg)] min-h-screen bg-cover bg-center flex flex-col items-center justify-center rounded-lg'>
        <div className='flex flex-col text-white gap-10 items-center p-5 py-10 bg-[#15514f59] w-8/12 justify-center mt-4 rounded-xl'>
          <div className='flex items-center justify-center gap-5'>
            <img className='w-32 h-32 rounded-full' src={user?.photoURL} alt="" />
            <div className='text-2xl'>
              <p className='flex gap-3 items-center font-extrabold'><FaUserAlt className='text-primary' />
                {user?.displayName}</p>
              <p className='flex gap-3 items-center'><MdEmail className='text-primary' /> {user?.email}</p>
              <p className='flex gap-3 items-center'> <TbActivityHeartbeat className='text-primary' />Role: <span className='capitalize  '>{userRole}</span> </p>
            </div>
          </div>
          <div className='w-full justify-center items-center text-center space-y-4'>
            <h1 className='font-extrabold text-fourth text-2xl'>Want to update profile?</h1>

            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto flex flex-1 flex-col gap-5 lg:w-8/12 md:w-10/12 w-full relative'>

              <label data-aos="zoom-out-left" data-aos-duration='1000' className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input defaultValue={user?.displayName} className='text-black w-full p-3 border rounded-lg' type="text" name='name' placeholder="Enter Your Username" {...register("name", { required: true })} />
              </label>
              {errors.name && <span className='text-fourth text-xl'>This field is required</span>}

              <label data-aos="zoom-out-left" data-aos-duration='1000' className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                <input className='text-black w-full p-3 border rounded-lg' type="file" placeholder="Your Photo" {...register("PhotoURL", { required: true })} />
              </label>
              {errors.PhotoURL && <span className='text-fourth text-xl'>This field is required</span>}

              <Button className='w-6/12 mx-auto text-white bg-accent hover:bg-primary hover:text-black font-extrabold' type='submit'>Update</Button>
            </form>

          </div>
        </div>

      </div>
    </div>
  )
}
