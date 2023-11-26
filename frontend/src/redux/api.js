import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

let axiosLink="http://localhost:7000"
export const loginApi = createAsyncThunk('users/login',async(data) => {
      const response = await axios.post(`${axiosLink}/user/login`,{...data})
      localStorage.setItem("name",response.data.user.name)
      return response.data
    }
  )
export const signupApi = createAsyncThunk('users/signup',async(data) => {
      const response = await axios.post(`${axiosLink}/user/register`,{...data})
      return response.data
    }
  )
  export const usersSlice = createSlice({
    name: 'users',
    initialState: {
      data: [],
      loading:false,
      error: false,
    },
   
    extraReducers: (builder) => {
      builder
        .addCase(loginApi.pending, (state, action) => {
            state.loading = true
        })
        .addCase(loginApi.fulfilled, (state, action) => {
          state.loading=false
        })
        .addCase(loginApi.rejected, (state, action) => {
            state.loading=false
            state.error=true
          }
        )
        .addCase(signupApi.pending, (state, action) => {
            state.loading = true
        })
        .addCase(signupApi.fulfilled, (state, action) => {
          state.loading=false
        })
        .addCase(signupApi.rejected, (state, action) => {
            state.loading=false
            state.error=true
          }
        )
    },
  })
  

  export default usersSlice.reducer