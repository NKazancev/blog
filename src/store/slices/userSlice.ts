import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  isLogged: boolean;
  isUpdated: boolean;
  errorMessage: string;
}

const initialState: IUserState = {
  isLogged: false,
  isUpdated: false,
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
    updateUser(state) {
      state.isUpdated = true;
    },
    resetUserStatus(state) {
      state.isUpdated = false;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = '';
    },
  },
});

export default userSlice.reducer;
export const {
  setUser,
  removeUser,
  updateUser,
  resetUserStatus,
  setErrorMessage,
  clearErrorMessage,
} = userSlice.actions;
