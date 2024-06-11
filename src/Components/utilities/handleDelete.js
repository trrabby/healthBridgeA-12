import toast from "react-hot-toast"
import { useAxiosCommon } from "../../Hooks/useAxiosCommon"
import Swal from "sweetalert2"

const axiosCommon = useAxiosCommon()

export const handleDelete = async (route, refetch) => {

    const shouldDelete = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    })
    // console.log(shouldDelete)

    if (shouldDelete.isConfirmed) {

        const { data } = await axiosCommon.delete(route)
        if (data.deletedCount > 0) {
            refetch()
            toast.success('Deleted Successfully')
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });

        }
    }

}