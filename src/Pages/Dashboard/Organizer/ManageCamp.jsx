import React from 'react'
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

export const ManageCamp = () => {
  const { camps,refetch } = useAllCamps()
  // console.log(camps)

const deleteHandler = async (idData) => {
    try {
      await handleDelete(idData , refetch)
    }
    catch (err) {
      console.log(err)
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
                camps.map((item, i) => <tr key={item._id} data-aos="fade-left" data-aos-duration="800" className='hover:bg-[#dab9b93b] border-b text-center'>
                  <th>{i + 1}</th>
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
        </div>
      </div>
    </div>
  )
}
