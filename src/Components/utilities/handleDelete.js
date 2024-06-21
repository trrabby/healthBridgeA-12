import toast from "react-hot-toast"
import { useAxiosCommon } from "../../Hooks/useAxiosCommon"
import Swal from "sweetalert2"

const axiosCommon = useAxiosCommon()

export const handleDelete = async (route, refetch, setLoading) => {

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
        setLoading(true)
        const { data } = await axiosCommon.delete(route)
        if (data.deletedCount > 0) {
            setLoading(false)
            refetch()
            toast.success('Deleted Successfully')
            Swal.fire({
                title: "Deleted!",
                text: "Camp has been deleted.",
                icon: "success"
            });

        }
    }

}