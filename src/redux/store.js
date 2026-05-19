import { configureStore } from "@reduxjs/toolkit";
import { loadUser } from "./reducers/User/User";
import { employeeGetAllApplication, jobSeekerGetAllApplication } from "./reducers/Application/Application";
import { getAllJobs, getMyJobsSlice } from "./reducers/Job/Job";

const store = configureStore({
  reducer: {
    user: loadUser.reducer,
        appliedApplication: jobSeekerGetAllApplication.reducer,
        applicants: employeeGetAllApplication.reducer,
    myJobs: getMyJobsSlice.reducer,
  
        allJobs : getAllJobs.reducer
  },
});
export default store;
