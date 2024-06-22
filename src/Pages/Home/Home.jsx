import React from 'react'
import { Slider } from '../../Components/Slider/Slider'
import { SectionHead } from '../../Components/SectionHead'
import { useTopPopularCamps } from '../../Hooks/useTopPopularCamps'
import { Camp } from '../../Components/Camp'
import { split } from 'postcss/lib/list'
import { Link } from 'react-router-dom'
import { useFeedbackData } from '../../Hooks/useFeedbackData'
import { Feedback } from '../../Components/Feedback'
import FeedbackSlider from '../../Components/FeedbackSlider/FeedbackSlider'
import { LoadingSpinnerCircle } from '../../Components/LoadingSpinnerCircle'
import toast from 'react-hot-toast'

export const Home = () => {
  const { mostRegCamps, isLoading } = useTopPopularCamps()
  const { feedback } = useFeedbackData()
  // console.log(feedback)
  if (isLoading) {
    return <LoadingSpinnerCircle></LoadingSpinnerCircle>
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    const data = e.target.subscribe.value

    if (data) {
      toast.success('Subscribed Successfully')
      e.target.subscribe.value = ""
    }

  }
  return (
    <div>
      <Slider></Slider>

      {/* Popular camps */}
      <div className='my-10'>
        <SectionHead
          title={'Top Popular Camps'}
          para={'Our top popular camps offer fun adventures, skill-building, and memorable outdoor experiences for all ages.'}
        ></SectionHead>
        <div className=''>
          <div className={`grid grid-flow-row grid-cols-1 lg:grid-cols-2 justify-between gap-5 p-0 mb-10 lg:w-full w-10/12 mx-auto mt-5 `}>
            {
              mostRegCamps.slice(0, 6).map(camp => <Camp key={camp._id} camp={camp}></Camp>)
            }
          </div>
          <div className='flex'>
            <Link to={'/availableCamps'} className="w-4/12 mx-auto lg:right-0 rounded-sm px-5 py-2 text-base font-bold shadow-accent shadow-lg hover:shadow-fourth border duration-500 sm:w-auto text-right ">See All</Link>
          </div>


        </div>
      </div>
      {/* Our honorable members */}
      <div className='my-10 space-y-5'>

        <SectionHead
          title={"Meet Health Bridge Professionals"}
          para={'Meet our team of passionate professionals committed to exceptional camp experiences.'}
        ></SectionHead>
        <div className='flex flex-col justify-center items-center border rounded-3xl w-6/12 mx-auto shadow-lg hover:shadow-accent shadow-primary duration-300 p-5 px-7'>
          <div className='w-24 h-24'>
            <img className='content-center rounded-xl' src={'https://i.ibb.co/r77xgCH/Whats-App-Image-2024-05-15-at-15-43-56.jpg'} alt="No Photo Aval" />
          </div><br /><br />
          <h1 className='text-xl font-bold'>MD TOWFIQUR RAHMAN</h1>
          <h1 className='font-bold'>Head Of Team</h1>
        </div>
        <div className='grid grid-flow-col grid-cols-3'>
          <div className='flex flex-col justify-center items-center border rounded-3xl mx-auto shadow-lg hover:shadow-accent shadow-primary duration-300 p-5 px-7 w-10/12  '>
            <div className='w-20 h-20'>
              <img className='content-center rounded-xl' src={'https://i.ibb.co/xGRKzjq/1668674433825.jpg'} alt="No Photo Aval" />
            </div><br />
            <h1 className='text-xl font-bold'>KHALEKUR RAHMAN</h1>
            <h1 className='font-bold'>Head Of Operation</h1>
          </div>
          <div className='flex flex-col justify-center items-center border rounded-3xl mx-auto shadow-lg hover:shadow-accent shadow-primary duration-300 p-5 px-7  w-10/12'>
            <div className='w-20 h-20'>
              <img className='content-center rounded-xl' src={'https://i.ibb.co/X7c6bVT/fahim-ahmed-256x256.jpg'} alt="No Photo Aval" />
            </div><br />
            <h1 className='text-xl font-bold'>TASFIQUR BIN ZAYED</h1>
            <h1 className='font-bold'>Head Of Talent Accuisition</h1>
          </div>
          <div className='flex flex-col justify-center items-center border rounded-3xl mx-auto shadow-lg hover:shadow-accent shadow-primary duration-300 p-5 px-7  w-10/12'>
            <div className='w-20 h-20'>
              <img className='content-center rounded-xl' src={'https://i.ibb.co/2PFSLpw/1516563317575.jpg'} alt="No Photo Aval" />
            </div><br />
            <h1 className='text-xl font-bold'>RICHARD FAME</h1>
            <h1 className='font-bold'>Head Of Foreign Affiers</h1>
          </div>

        </div>
      </div>
      {/* Feedback and Rating */}
      <div className='my-10'>
        <SectionHead
          title={'Feedback and Rating'}
          para={'Our camps receive excellent feedback and high ratings for their engaging activities and superb organization.'}
        ></SectionHead>

        <FeedbackSlider
          feedback={feedback}
        ></FeedbackSlider>
      </div>
      {/* Newsletters */}
      <section id='subscribe' className="container flex lg:flex-row flex-col-reverse justify-end lg:items-center lg:mt-20 my-10 lg:my-0 gap-10">
        <div data-aos="fade-right" data-aos-duration="1000" className="text-center sm:text-left md:col-span-4 lg:col-span-2">
          <p className="text-2xl font-extrabold text-gray-900">Stay in Touch</p>

          <div className="mx-auto mt-8 max-w-md sm:ms-0">
            <p className="lg:text-left  leading-relaxed text-gray-500 ltr:sm:text-left rtl:sm:text-right">
              "Connect with us today! Reach out for inquiries, collaborations, or just to say hello. We're here to listen and assist."</p>

            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                <label htmlFor="email" className="sr-only">Email</label>

                <input
                  className="lg:w-full w-10/12 mx-auto rounded-sm border-gray-200 px-6 py-3 shadow-sm shadow-accent"
                  type="email"
                  placeholder="Enter your email"
                  name='subscribe'
                  required
                />

                <button
                  className="block w-4/12 mx-auto lg:m-0 rounded-sm px-5 py-2 text-base font-bold shadow-accent shadow-lg hover:shadow-primary border duration-500 sm:w-auto "
                  type="submit"
                >
                  Subscribe
                </button>


              </div>
            </form>
          </div>
        </div>

        <div className="h-64 w-full sm:h-96 lg:w-6/12">
          <img alt=""
            src="https://i.ibb.co/NNwHwZ8/premium-photo-1681883457631-e21611e38757.jpg"
            className="inset-0 h-full w-full object-cover rounded-t-xl"
          />
        </div>
      </section>

    </div>
  )
}
