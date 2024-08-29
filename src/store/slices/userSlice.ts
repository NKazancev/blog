import { createSlice } from '@reduxjs/toolkit';

import IUser from 'models/user';

interface IUserState {
  user: IUser | null;
  token: string;
  loadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  errorMessage: string;
}

const initialState: IUserState = {
  user: null,
  token: '',
  loadingStatus: 'idle',
  errorMessage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setToken } = userSlice.actions;
