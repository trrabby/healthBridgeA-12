import React, { useContext, useState } from 'react'
import { useAllCamps } from '../../../Hooks/useAllCamps'
import { SectionHead } from '../../../Components/SectionHead'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'
import { useAxiosCommon } from '../../../Hooks/useAxiosCommon'
import { MdDeleteOutline } from 'react-icons/md'
import { GrDocumentUpdate } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import toast from 'react-hot-toast'
import { handleDelete } from '../../../Components/utilities/handleDelete'
import { useQuery } from '@tanstack/react-query'
import { useAllCampsCount } from '../../../Hooks/useAllCampsCount'
import { ContextApi } from '../../../Providers/ContextProvider'
import { LoadingSpinnerCircle } from '../../../Components/LoadingSpinnerCircle'

export const ManageCamp = () => {

  const {setLoading, loading}= useContext(ContextApi)
  const { campsCount } = useAllCampsCount()
  // console.log(campsCount)

  const [currentPage, setCurrentPage] = useState(0);
  // console.log(currentPage)
  const itemPerPage = 10;
  const numberOfPage = Math.ceil(campsCount / itemPerPage)
  // console.log(numberOfPage)
  const pages = [...Array(numberOfPage).keys()];
  // console.log(pages)


  const axiosCommon = useAxiosCommon()

  const { data: camps = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['camps', currentPage, handleDelete],
    queryFn: () => campsData(),
  })

  const campsData = async () => {
    const { data } = await axiosCommon(`/campsDataPagination/?page=${currentPage}&&size=${itemPerPage}`)
    return data
  }

  if(loading || isLoading){
    return <LoadingSpinnerCircle></LoadingSpinnerCircle>
  }
  const deleteHandler = async (idData) => {
    try {
      await handleDelete(idData, refetch, setLoading)
    }
    catch (err) {
      console.log(err)
    }

  }
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < numberOfPage-1) {
      setCurrentPage(currentPage + 1)
    }
  }


  return (
    <div>
      <Helmet>
        <title>Health Bridge | Manage Camps</title>
      </Helmet>
      <SectionHead
        title={"All Camps"}
      ></SectionHead>
      <div className='overflow-x-auto'>
        <div>
          <table className="table-sm w-full text-center">
            {/* head */}
            <thead className='underline text-center' >
              <tr >
                <th>Ser No</th>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Health Care Professional</th>
                <th>Update/Delete</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody >
              {camps &&
                camps.map((item, i) => <tr key={item._id}  className='hover:bg-[#dab9b93b] border-b text-center'>
                  <th>{i + 1}.</th>
                  <td>{item.title}</td>
                  <td>{item.startDate}</td>
                  <td>{item.startTime}</td>
                  <td>{item.loc}</td>
                  <td>{item.healtCareProf}</td>

                  <td className='flex gap-3 items-center justify-center'><Link to={`/dashboard/update/${item._id}`}>
                    <Button className='btn btn-outline text-white hover:bg-accent bg-third font-bold hover:scale-105 hover:duration-300 flex items-center gap-2 justify-center p-2'> <GrDocumentUpdate /></Button>
                  </Link>
                    <button onClick={() => deleteHandler(`/camps/${item._id}`)}
                      className="bg-accent p-2 text-center text-xs font-bold uppercase text-white transition hover:bg-red-500 hover:text-black duration-700 flex items-center gap-2"><MdDeleteOutline /></button>
                  </td>


                </tr>

                )

              }


            </tbody>
          </table>
          <div className='text-center bg-third backdrop-blur-0 p-2 text-white flex gap-2 justify-center items-center' >
            <button
              onClick={handlePrev} className='bg-white text-black hover:bg-fourth duration-500 mr-3 px-3 rounded-full'>Prev</button>
            {
              pages && pages.map((page, i) => {

                const count = parseInt(page + 1)

                return <button
                  key={i}
                  onClick={() => setCurrentPage(count)}
                  className={`bg-white text-black hover:bg-fourth duration-500 mr-3 px-2 rounded-full ${currentPage === page && 'bg-fourth text-white'}`}
                >{page + 1}</button>

              })
            }
            <button
              onClick={handleNext}
              className='bg-white text-black hover:bg-fourth duration-500 mr-3 px-3 rounded-full'>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
