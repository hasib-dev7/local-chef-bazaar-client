import axios from "axios";

export const saveUserUpdateData = async (userData) => {
  const { data } = axios.post(
    `${import.meta.env.VITE_API_URL}/users`,
    userData
  );
  return data;
};
