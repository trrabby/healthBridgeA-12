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

export const Home = () => {
  const { mostRegCamps, isLoading } = useTopPopularCamps()
  const { feedback } = useFeedbackData()
  // console.log(feedback)
if(isLoading){
  return <LoadingSpinnerCircle></LoadingSpinnerCircle>
}
  return (
    <div>
      <Slider></Slider>

      {/* Popular camps */}
      <div>
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
      {/* Feedback and Rating */}
      <div>
        <SectionHead
          title={'Feedback and Rating'}
          para={'Our camps receive excellent feedback and high ratings for their engaging activities and superb organization.'}
        ></SectionHead>
      </div>

      <FeedbackSlider
        feedback={feedback}
      ></FeedbackSlider>
      {/* <div className='flex'>
        {feedback.map(feed => <Feedback key={ feed._id} feed={feed}></Feedback>)}
      </div> */}
    </div>
  )
}
