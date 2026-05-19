
/*import axios from 'axios'
import Cookies from 'js-cookie'
import { MAIN_URL } from '../../../URLS/config'
import { loadUserFailure, loadUserRequest, loadUserSuccess } from '../../reducers/User/User';
const token = localStorage.getItem("token");
export const login = async (details) => {
    try {
      const { email, password, role } = details;
  const res =       await axios.post(`${MAIN_URL}/user/login`, {
            email,password,role
  })
      localStorage.setItem("token", res.data.token);
        Cookies.set("token", res.data.token, { expires: 7 }); 
      return res.data
    }
    catch (e) {
        console.log("the error in login is ",e)
    }


}
export const register = async (options) => {
  try {
      const { email, password, role, name, phone } = options;
       const headers = {
         "Content-Type": "application/json",
           "Sec-Fetch-Mode": "navigate",
           "Sec-Fetch-Site": "cross-site",
       };
    const response = await axios.post(`${MAIN_URL}/user/register`, {
      email,
      password,
      role,
      name,
      phone,
    },
        headers
    );
    return response.data; 
  } catch (error) {
    console.error("Error in register:", error);
  
  }
};
export const profileUpdated = async (options) => {
  try {

    
    const res = await axios.put(`${MAIN_URL}/user/update`, { token, options }, {
    withCredentials : true
  }
    )
    return res.data
    
  } catch (error) {
    console.error("Error in register:", error);
  
  }
};
export const logout = async (options) => {
  try {
    localStorage.removeItem("token");
    const res = await axios.put(`${MAIN_URL}/user/logout`, {
      token
    }, {
    withCredentials : true
  }
    )
    return res.data
    
  } catch (error) {
    console.error("Error in register:", error);
  
  }
};
export const loadProfile = (options ) =>async (dispatch)  =>  {
  try {
    dispatch(loadUserRequest());
    const data = await axios.put(`${MAIN_URL}/user/profile`, {
    token
  },{
    withCredentials: true,
  });
  

    dispatch(loadUserSuccess(data?.data?.user))
    

  } catch (e) {
    console.log("the error is ", e);
    dispatch(loadUserFailure(e.message))
  }
}*/
import { createSlice } from "@reduxjs/toolkit";
export const loadUser = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    loadUserRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },

      loadUserSuccess: (state, action) => {

      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    },

    loadUserFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    },
  },
});

 export const {loadUserFailure,loadUserSuccess,loadUserRequest} =  loadUser.actions