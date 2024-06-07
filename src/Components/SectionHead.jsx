import React from 'react'

export const SectionHead = ({title, para}) => {
  return (
    <div className='mx-auto flex flex-col justify-center items-center py-5'>
        <h1 className='text-lg font-bold text-gray-900 sm:text-3xl'>{title}</h1>
        <p className='mt-4 text-gray-500 w-6/12 mx-auto text-center'>{para}</p>
    </div>
  )
}
