

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../Slider/slider.css'
import { useRef } from 'react';
import { Link } from 'react-router-dom';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';

export const Slider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
  };
  return (

    <div className='h-[calc(100vh-95px)] w-full'>
      <Swiper
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="myMainSwiper rounded-xl"
      >
        <SwiperSlide>
          <div className="flex flex-col h-full items-end text-left space-y-2 justify-end bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('https://i.ibb.co/4tHS9vt/photo-1442570468985-f63ed5de9086.jpg')] w-full bg-cover bg-center  lg:pt-5 lg:pb-5 p-5 rounded-lg">

            <div className='flex flex-col h-auto lg:w-8/12 w-full items-cenert justify-center p-5 pl-10 rounded-lg bg-[#071f1f73] space-y-1'>
              <p className='lg:text-3xl md:text-xl text-base text-orange-200 font-extrabold'>Darjeeling Himalayan, India</p>
            </div>
            
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col h-full items-end text-left space-y-2 justify-end bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('https://i.ibb.co/BPmdfCL/photo-1499678329028-101435549a4e.jpg')] w-full bg-cover bg-center  lg:pt-5 lg:pb-5 p-5 rounded-lg">

            <div className='flex flex-col h-auto lg:w-8/12 w-full items-cenert justify-center p-5 pl-10 rounded-lg bg-[#071f1f73] space-y-1'>
              <p className='lg:text-3xl md:text-xl text-base text-orange-200 font-extrabold'>Istambul, Turkey</p>
            </div>
            
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col h-full items-end text-left space-y-2 justify-end bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('https://i.ibb.co/VYysDzV/photo-1548013146-72479768bada.jpg')] w-full bg-cover bg-center  lg:pt-5 lg:pb-5 p-5 rounded-lg">

            <div className='flex flex-col h-auto lg:w-8/12 w-full items-cenert justify-center p-5 pl-10 rounded-lg bg-[#071f1f73] space-y-1'>
              <p className='lg:text-3xl md:text-xl text-base text-orange-200 font-extrabold'>Tajmahal, India</p>
            </div>
            
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col h-full items-end text-left space-y-2 justify-end bg-gray-400 dark:bg-gray-700 dark:text-white bg-[url('https://i.ibb.co/K5ZfHkQ/photo-1664834681881-5da1483e73df.jpg')] w-full bg-cover bg-center  lg:pt-5 lg:pb-5 p-5 rounded-lg">

            <div className='flex flex-col h-auto lg:w-8/12 w-full items-cenert justify-center p-5 pl-10 rounded-lg bg-[#071f1f73] space-y-1'>
              <p className='lg:text-3xl md:text-xl text-base text-orange-200 font-extrabold'>Lake Geneva, Switzerland</p>
            </div>
            
          </div>
        </SwiperSlide>
        

        <div className="autoplay-progress text-accent" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>

  )
}
