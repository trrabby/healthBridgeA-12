import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from "@material-tailwind/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import '../FeedbackSlider/Styles.css'

// import required modules
import { EffectCards } from 'swiper/modules';

export default function FeedbackSlider({ feedback }) {
    return (
        <>
            <div className='Feedback'>
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="myFeedbackSwiper"
                >
                    {
                        feedback.map(feed => <SwiperSlide>
                            <div className='flex flex-col justify-center items-center p-5'>
                                <div className='w-20 h-20 flex justify-center items-center border'>
                                    <img className='content-center' src={feed.feedbackGiverPhoto} alt="No Photo Aval" />
                                </div>
                                <h1 className='md:text-base text-sm'>{feed.feedbackGiverName}</h1><br />
                                <Rating value={feed.rating} readonly />
                                <h1 className='md:text-base text-sm'>{feed.title}</h1>
                                <h1 className='text-sm'>Experience: {feed.ratingText}</h1>
                            </div>
                        </SwiperSlide>)
                    }

                </Swiper>
            </div>
        </>
    );
}
