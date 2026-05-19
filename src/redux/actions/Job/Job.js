
import {
  getAllJobsRequest,
  getAllJobsSuccess,
  getMyJobsRequest,
  getMyJobsSuccess,
} from "../../reducers/Job/Job";
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
// GET ALL JOBS
export const getAllJobs = () => async (dispatch) => {
  try {
    dispatch(getAllJobsRequest());

    const { data } = await axiosInstance.get("/job/alljobs");

    dispatch(getAllJobsSuccess(data.jobs));
  } catch (e) {
    console.log("the error is ", e);
  }
};

// POST JOB
export const postJob = async (options) => {
  try {
    const { data } = await axiosInstance.post(
      "/job/postjob",
      options
    );

    return data;
  } catch (e) {
    console.log("the error is ", e);
  }
};

// GET MY JOBS
export const getMyJobs = () => async (dispatch) => {
  try {
    dispatch(getMyJobsRequest());

    const { data } = await axiosInstance.get("/job/myjobs");

    dispatch(getMyJobsSuccess(data.jobs));
  } catch (e) {
    console.log("the error is ", e);
  }
};

// UPDATE JOB
export const updateJob = async (options) => {
  try {
    console.log(options);

    const { data } = await axiosInstance.put(
      `/job/update/${options.jobId}`,
      options
    );

    return data;
  } catch (e) {
    console.log("the error is ", e);
  }
};

// GET SINGLE JOB
export const getSingleJob = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/job/${id}`);

    return data;
  } catch (e) {
    console.log("the error is ", e);
  }
};

// DELETE JOB
export const deleteJob = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/job/${id}`);

    return data;
  } catch (e) {
    console.log("the error is ", e);
  }
};
