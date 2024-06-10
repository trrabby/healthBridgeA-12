import { useContext } from "react";
import { ContextApi } from "./ContextProvider";
import { useLocation } from "react-router-dom";
import { useAdminRole } from "../Hooks/useAdminRole";



export const OrganizerRoute = ({ children }) => {
    const { user, loading } = useContext(ContextApi)
    const location = useLocation()
    const userRole = useAdminRole()
    const organizer = userRole === "organizer"
    // console.log(location.pathname)
    // console.log(loading)
    if (user && organizer) {
        return children
    }


    else {

        if (loading) {
            return <div className='w-full flex items-center justify-center'>
                <CgSpinnerTwoAlt className=" flex items-center justify-center animate-spin h-14 w-14 text-fourth"/>
            </div>;
        };

        if (!user) {
            return <Navigate to={'/joinUs'} state={location.pathname}> </Navigate>

        }
    }

}
