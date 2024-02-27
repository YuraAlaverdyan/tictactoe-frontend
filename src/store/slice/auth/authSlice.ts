import { IAuthState, IErrorResponse } from './auth.type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from 'utils/axios';

const initialState: IAuthState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  message: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (user: { username: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/login`, user);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (user: { username: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/register`, user);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = payload as IErrorResponse;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
        localStorage.setItem('accessToken', payload.data.token);
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = payload as IErrorResponse;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
        state.message = payload.data.message;
      });
  },
});

export const { resetAuthSlice } = authSlice.actions;