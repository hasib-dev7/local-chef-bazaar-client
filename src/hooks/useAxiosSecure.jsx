// import axios from "axios";

// const axiosSecure = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL}`,
// });

// const useAxiosSecure = () => {
//   return axiosSecure;
// };

// export default useAxiosSecure;
// .........................
import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut, authLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authLoading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        }
      );

      // Add response interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logOut()
              .then(() => {
                console.log("Logged out successfully.");
              })
              .catch(console.error);
            navigate("/login");
          }
          return Promise.reject(err);
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, authLoading, logOut, navigate]);

  return axiosInstance;
};
export default useAxiosSecure;
