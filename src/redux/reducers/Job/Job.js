
import { createSlice } from "@reduxjs/toolkit";
export const getAllJobs = createSlice({
  name: "getAllJobs",
  initialState: {
    loading: false,
    jobs: [],
  },
  reducers: {
    getAllJobsRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },

    getAllJobsSuccess: (state, action) => {
      return {
        ...state,
          loading: false,
          jobs : action.payload
      };
    },

    getAllJobsFailure: (state, action) => {
      return {
        ...state,
          loading: false,
        error : action.payload
      };
    },
  },
});
export const getMyJobsSlice = createSlice({
  name: "getMyJobs",
  initialState: {
    loading: false,
    jobs : [],
  },
  reducers: {
    getMyJobsRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },

    getMyJobsSuccess: (state, action) => {
      return {
        ...state,
          loading: false,
        jobs : action.payload
      };
    },

    getMyJobsFailure: (state, action) => {
      return {
        ...state,
          loading: false,
        error  :action.payload
      };
    },
  },
});
export const getSingleJobSlice = createSlice({
    name: "post",
    initialState: {
        
    },
    reducers: {
        getSingleJobRequest: (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
    
        getSingleJobSuccess: (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
    
        postJobFailure : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
    
        
    }

    
})
export const { getAllJobsFailure, getAllJobsRequest, getAllJobsSuccess } = getAllJobs.actions
export const {getMyJobsRequest,getMyJobsSuccess,getMyJobsFailure} = getMyJobsSlice.actions