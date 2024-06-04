import axios from 'axios'

const axiosCommon = axios.create({
    baseURL: import.meta.env.VITE_apiurl
})

export const useAxiosCommon = () => {
   return axiosCommon
}
