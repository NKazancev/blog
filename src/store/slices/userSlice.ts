import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  isLogged: boolean;
  errorMessage: string;
}

const initialState: IUserState = {
  isLogged: false,
  errorMessage: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state) {
      state.isLogged = true;
    },
    removeUser(state) {
      state.isLogged = false;
    },
    setMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser, removeUser, setMessage } = userSlice.actions;
