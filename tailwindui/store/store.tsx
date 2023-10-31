import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export interface RootState {
    user: {
      uid: string | null;
      token: string | null;
    };
  }

export default store;
