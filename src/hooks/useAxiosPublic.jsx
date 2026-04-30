import axios from "axios";

export const axiosPublic = axios.create({
    baseURL : "https://bistro-boss-server-gamma-five.vercel.app"
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;