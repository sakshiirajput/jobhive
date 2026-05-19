import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Signup from '../pages/Sign Up/Signup'
import Home from '../pages/Home/Home'
import AllJobs from '../pages/All Jobs/AllJobs'
import Navbar from '../Components/Navbar/Navbar'
import MyApplications from '../pages/My Applications/MyApplications'
import MyJobs from '../pages/My Jobs/MyJobs'
import Applicants from '../pages/Applicants/Applicants'
import PostJob from '../pages/PostJobs/PostJob'
import { useSelector, useDispatch } from 'react-redux';
import ApplyJob from '../pages/ApplyJob/ApplyJob'

const Application = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  
  
  return (
    <div>
      <Navbar/>
          <Routes>
              <Route
                  path = '/login' element = {<Login/>}
              />
              <Route
                  path = '/signup' element = {<Signup/>}  />
              <Route
                  path = '/' element = {<Home/>}  />
              <Route
          path='/alljobs' element={<AllJobs />} />
        {
          isAuthenticated && (user?.role == 'Job Seeker') ?
            <>
            <Route
              path='/myapplication' element={<MyApplications />} />
            <Route
              path='/applyjob/:id' element={<ApplyJob />} />
              </>
            :
            <>
     
            <Route
              path='/applicants' element={< Applicants/>} />
            <Route
              path='/myjobs' element={<MyJobs />} />

            <Route
              path='/postjob' element={<PostJob />} />
            </>
            
        }
          </Routes>
    </div>
  )
}

export default Application