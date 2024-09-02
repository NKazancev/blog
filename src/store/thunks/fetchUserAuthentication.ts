import { createAsyncThunk } from '@reduxjs/toolkit';

import { setErrorMessage, setUser } from '../slices/userSlice';

type AuthenticationUserData = {
  email: string;
  password: string;
};

const fetchUserAuthentication = createAsyncThunk(
  'user/fetchUserAuthentication',
  async (data: AuthenticationUserData, { dispatch, rejectWithValue }) => {
    const url = 'https://blog.kata.academy/api/users/login';
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
        dispatch(setErrorMessage('Email or password is incorrect'));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchUserAuthentication;
