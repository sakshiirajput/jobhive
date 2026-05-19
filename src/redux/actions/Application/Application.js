
import {
  EmployeeApplicationFailure,
  employeeApplicationRequest,
  employeeApplicationSuccess,
  jobSeekerGetAllApplicationFailure,
  jobSeekerGetAllApplicationRequest,
  jobSeekerGetAllApplicationSuccess,
} from "../../reducers/Application/Application";
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

// POST APPLICATION
export const postApplication = async (options) => {
  try {
    console.log("the application is", options);

    const { data } = await axiosInstance.post(
      "/application/postapplication",
      options
    );

    return data;
  } catch (e) {
    console.log("the error is ", e);
  }
};

// EMPLOYEE GET ALL APPLICATIONS
export const employeeGetAllApplication = () => async (dispatch) => {
  try {
    dispatch(employeeApplicationRequest());

    const { data } = await axiosInstance.get(
      "/application/employeeapplications"
    );

    dispatch(employeeApplicationSuccess(data.applications));
  } catch (e) {
    dispatch(EmployeeApplicationFailure(e.message));
    console.log("the error is ", e);
  }
};

// JOB SEEKER GET ALL APPLICATIONS
export const jobSeekerGetAllApplication = () => async (dispatch) => {
  try {
    dispatch(jobSeekerGetAllApplicationRequest());

    const { data } = await axiosInstance.get(
      "/application/jobseekerapplications"
    );

    dispatch(jobSeekerGetAllApplicationSuccess(data.applications));
  } catch (e) {
    dispatch(jobSeekerGetAllApplicationFailure(e.message));
    console.log("the error is ", e);
  }
};

// DELETE APPLICATION
export const jobSeekerDeleteApplication = async (id) => {
  try {
    const { data } = await axiosInstance.delete(
      `/application/deleteapplication/${id}`
    );

    return data;
  } catch (e) {
    console.log("the error is ", e);
  }
};
