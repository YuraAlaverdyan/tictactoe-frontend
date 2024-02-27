import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from 'utils/axios';
import { IGameState, IHandleActions } from './game.type';
import { IErrorResponse, IUser } from '../auth/auth.type';

const initialState: IGameState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  onlineUsers: null,
  user: {} as IUser,
  invitePlayer: {} as IHandleActions,
};

export const getUser = createAsyncThunk(
  'game/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user`);

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

export const invitePlayer = createAsyncThunk(
  'game/invitePlayer',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/user/invitePlayer`, { userId });

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

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGameSlice: () => initialState,
    resetInviteState: (state) => {
      state.invitePlayer = {} as IHandleActions;
    },
    setOnlineUsers: (state, { payload }) => {
      state.onlineUsers = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = {} as IUser;
        state.error = payload as IErrorResponse;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload.data;
        state.error = null;
      })

      //Invite player
      .addCase(invitePlayer.pending, (state) => {
        state.invitePlayer.isLoading = true;
      })
      .addCase(invitePlayer.rejected, (state, { payload }) => {
        state.invitePlayer.isLoading = false;
        state.invitePlayer.isSuccess = false;
        state.invitePlayer.error = payload as IErrorResponse;
      })
      .addCase(invitePlayer.fulfilled, (state, { payload }) => {
        state.invitePlayer.isLoading = false;
        state.invitePlayer.isSuccess = true;
        state.invitePlayer.message = payload.message;
        state.invitePlayer.error = null;
      });
  },
});

export const { resetGameSlice, resetInviteState, setOnlineUsers } = gameSlice.actions;