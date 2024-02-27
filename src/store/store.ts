import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slice/auth/authSlice';
import { gameSlice } from './slice/game/gameSlice';

const reducer = combineReducers({
  auth: authSlice.reducer,
  game: gameSlice.reducer
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;