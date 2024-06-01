import axios from 'axios'

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_apiurl,
    withCredentials: true,
})

export const useAxiosSecure = () => {
   return axiosSecure
}
