import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  clearErrorMessage,
  setErrorMessage,
  setUser,
} from '../slices/userSlice';

type RegistrationUserData = {
  username: string;
  email: string;
  password: string;
};

const fetchUserRegistration = createAsyncThunk(
  'user/fetchUserRegistration',
  async (data: RegistrationUserData, { dispatch, rejectWithValue }) => {
    const url = 'https://blog.kata.academy/api/users';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: data }),
      });
      if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        localStorage.setItem('user', JSON.stringify(user.user));
      }
      if (response.status === 422) {
        dispatch(clearErrorMessage());
        const errorData = await response.json();
        const error = await errorData.errors;
        if (error.username)
          dispatch(setErrorMessage('Such username already exist'));
        if (error.email) dispatch(setErrorMessage('Such email already exist'));
        if (error.email && error.username)
          dispatch(setErrorMessage('Such username and email already exist'));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchUserRegistration;
