import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";


const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-server-gamma-five.vercel.app",
});

const useAxiosSecure = () => {

  const navigate = useNavigate();
  const {logOut} = useAuth();

  // Request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  // response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logOut(); 
        navigate("/login"); 
      }
      return Promise.reject(error);
    },
  );

  return axiosSecure;
};
export default useAxiosSecure;
