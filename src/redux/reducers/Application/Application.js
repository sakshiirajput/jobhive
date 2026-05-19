


import { createSlice } from "@reduxjs/toolkit";
export const employeeGetAllApplication = createSlice({
  name: "EmployeeApplication",
  initialState: {
    loading: false,
    applicants : [],
  },
  reducers: {
    employeeApplicationRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },

    employeeApplicationSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        applicants : action.payload
      };
    },

    EmployeeApplicationFailure: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const jobSeekerGetAllApplication = createSlice({
  name: "EmployeeApplication",
  initialState: {
    loading: false,
    applications : []

  },
  reducers: {
    jobSeekerGetAllApplicationRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },

    jobSeekerGetAllApplicationSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        applications : action.payload
      };
    },

    jobSeekerGetAllApplicationFailure: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const { employeeApplicationRequest, EmployeeApplicationFailure, employeeApplicationSuccess } = employeeGetAllApplication.actions;


export const { jobSeekerGetAllApplicationFailure,
    jobSeekerGetAllApplicationSuccess, jobSeekerGetAllApplicationRequest } = jobSeekerGetAllApplication.actions
