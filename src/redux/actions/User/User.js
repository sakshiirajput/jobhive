
import {
  loadUserFailure,
  loadUserSuccess,
} from "../../reducers/User/User";
import axios from "axios";
import { MAIN_URL } from "../../../URLS/config";

const axiosInstance = axios.create({
  baseURL: MAIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
// LOGIN
export const login = async (details) => {
  try {
    const { email, password, role } = details;

    const { data } = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.token);

    return data;
  } catch (e) {
    console.log("the error in login is ", e);
  }
};

// REGISTER
export const register = async (options) => {
  try {
    const { email, password, role, name, phone } = options;

    const { data } = await axiosInstance.post("/user/register", {
      email,
      password,
      role,
      name,
      phone,
    });

    return data;
  } catch (error) {
    console.error("Error in register:", error);
  }
};

// UPDATE PROFILE
export const profileUpdated = async (options) => {
  try {
    const { data } = await axiosInstance.put(
      "/user/update",
      options
    );

    return data;
  } catch (error) {
    console.error("Error in profile update:", error);
  }
};

// LOGOUT
export const logout = async () => {
  try {
    localStorage.removeItem('token')
    const { data } = await axiosInstance.get("/user/logout");

    return data;
  } catch (error) {
    console.error("Error in logout:", error);
  }
};

// LOAD PROFILE
export const loadProfile = () => async (dispatch) => {
  try {
    // dispatch(loadUserRequest());

    const { data } = await axiosInstance.get("/user/profile");

    console.log(data, "the data is");

    dispatch(loadUserSuccess(data?.user));
  } catch (e) {
    console.log("the error is ", e);

    dispatch(loadUserFailure(e.message));
  }
};
