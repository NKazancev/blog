import { createAsyncThunk } from '@reduxjs/toolkit';

import { setMessage, setUser } from '../slices/userSlice';

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
        const errorData = await response.json();
        const error = await errorData.errors;
        if (error.username) dispatch(setMessage('Username is already taken'));
        if (error.email) dispatch(setMessage('Email is already taken'));
        if (error.email && error.username)
          dispatch(setMessage('Username and email are already taken'));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchUserRegistration;
