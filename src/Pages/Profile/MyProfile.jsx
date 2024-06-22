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

  // bg-[url(https://i.ibb.co/L9LCF3p/kenrick-mills-rfe-PWka7-VPU-unsplash-1.jpg)] 
  return (
    <div>
      <div className="bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20%20width%3D%2729%27%20height%3D%2729%27%20viewBox%3D%270%200%20200%20200%27%3E%3Crect%20fill%3D%27%238ECAE6%27%20width%3D%27200%27%20height%3D%27200%27%2F%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27a%27%20gradientUnits%3D%27userSpaceOnUse%27%20x1%3D%27100%27%20y1%3D%2733%27%20x2%3D%27100%27%20y2%3D%27-3%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27000%27%20stop-opacity%3D%270%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27000%27%20stop-opacity%3D%271%27%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%27b%27%20gradientUnits%3D%27userSpaceOnUse%27%20x1%3D%27100%27%20y1%3D%27135%27%20x2%3D%27100%27%20y2%3D%2797%27%3E%3Cstop%20offset%3D%270%27%20stop-color%3D%27000%27%20stop-opacity%3D%270%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27000%27%20stop-opacity%3D%271%27%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cg%20%20fill%3D%27%236eaac5%27%20fill-opacity%3D%270.5%27%3E%3Crect%20x%3D%27100%27%20%20width%3D%27100%27%20height%3D%27100%27%2F%3E%3Crect%20y%3D%27100%27%20%20width%3D%27100%27%20height%3D%27100%27%2F%3E%3C%2Fg%3E%3Cg%20fill-opacity%3D%270.5%27%3E%3Cpolygon%20fill%3D%27url(%23a)%27%20points%3D%27100%2030%200%200%20200%200%27%2F%3E%3Cpolygon%20fill%3D%27url(%23b)%27%20points%3D%27100%20100%200%20130%200%20100%20200%20100%20200%20130%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] min-h-[calc(100vh-100px)] bg-center flex flex-col items-center justify-center rounded-lg">
        
        <div className='flex flex-col text-white gap-10 items-center p-5 py-5 bg-[#14535191] md:w-8/12 w-11/12 justify-center mt-4 rounded-xl'>
          <div className='flex md:flex-row flex-col items-center justify-center gap-5'>
            <img className='w-32 h-32 rounded-full' src={user?.photoURL} alt="" />
            <div className='text-2xl'>
              <p className='flex gap-3 items-center font-extrabold lg:text-2xl text-lg text-fourth drop-shadow-2xl shadow-white'><FaUserAlt className='text-primary' />
                {user?.displayName}</p>
              <p className='flex gap-3 items-center md:text-lg text-base'><MdEmail className='text-primary' /> {user?.email}</p>
              <p className='flex gap-3 items-center md:text-lg text-base'> <TbActivityHeartbeat className='text-primary' />Role: <span className='capitalize  '>{userRole}</span> </p>
            </div>
          </div>
          <div className='w-full justify-center items-center text-center space-y-4'>
            <h1 className='font-extrabold text-fourth lg:text-2xl text-lg'>Want to update profile?</h1>

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
