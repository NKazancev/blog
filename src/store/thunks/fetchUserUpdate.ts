import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  clearErrorMessage,
  setErrorMessage,
  setUser,
  updateUser,
} from '../slices/userSlice';

type UpdateUserData = {
  token: string;
  userData: {
    username: string;
    email: string;
    password: string;
    image: string | null;
  };
};

const fetchUserUpdate = createAsyncThunk(
  'user/fetchUserUpdate',
  async (myData: UpdateUserData, { dispatch, rejectWithValue }) => {
    const { token, userData } = myData;
    const url = 'https://blog.kata.academy/api/user';

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          user: userData,
        }),
      });
      if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        dispatch(updateUser());
        localStorage.setItem('user', JSON.stringify(user.user));
      }
      if (response.status === 422) {
        dispatch(clearErrorMessage());
        const errorData = await response.json();
        const error = await errorData.errors;
        if (error.username)
          dispatch(setErrorMessage('Such username already exists'));
        if (error.email) dispatch(setErrorMessage('Such email already exists'));
        if (error.email && error.username) {
          dispatch(setErrorMessage('Such username and email already exist'));
        }
        if (error.email === 'is invalid' || error.username === 'is invalid')
          dispatch(setErrorMessage('Entered data is incorrect'));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchUserUpdate;
