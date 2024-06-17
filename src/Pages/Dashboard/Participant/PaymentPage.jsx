import React, { useState } from 'react'
import { SectionHead } from '../../../Components/SectionHead'
import { useParams } from 'react-router-dom'
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinnerCircle } from '../../../Components/LoadingSpinnerCircle'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk)


export const PaymentPage = () => {
  const { id } = useParams()

  const axiosSecure = useAxiosSecure()

  const { data: campDetails = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['campDetailsInPayment'],
    queryFn: () => campData(),

  })
  // console.log(data)

  const campData = async () => {
    const { data } = await axiosSecure(`/regCamps_default/${id}`);
    return data
  }

  // console.log(camp)

  if (isLoading) {
    return <LoadingSpinnerCircle></LoadingSpinnerCircle>
  }

  const { _id, title, campFee, startDate, endDate, startTime, endTime, loc, healtCareProf, participantCount, email, user_name, description, thumbnail } = campDetails;


  return (
    <div data-aos="fade-left" data-aos-duration="800">
      <SectionHead
        title={'Your Payment Details'}
        para={'Your Are Paying For...'}
      ></SectionHead>
      <div>
        <div className='mt-4 w-full'>
          <div className='flex flex-col justify-center items-center'>

            <div>
              <h3 className="font-bold uppercase text-gray-900">
                Camp Name: {title}
              </h3>
             <h3 className="font-bold  text-gray-900 flex gap-2 items-center">
                Location: {loc}
              </h3>
              <h3 className="font-bold  text-gray-900 flex gap-2 items-center">
                Health Care Professional: {healtCareProf}
              </h3>
              <hr className='mt-10' />
              <h3 className="font-bold text-center flex gap-2 justify-center items-center text-accent">
                Total Payable Amount: {campFee} tk only
              </h3>
              <hr/>
            </div>

            <div className='w-6/12 mx-auto'>
              <SectionHead
                title={"Stripe Gateway"}
              ></SectionHead>

              <Elements stripe={stripePromise}>
                {/* checkout form */}
                <CheckoutForm
                  bookingInfo={campDetails}
                  refetch={refetch}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
