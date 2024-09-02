import { createAsyncThunk } from '@reduxjs/toolkit';

import { setErrorMessage, setUser } from '../slices/userSlice';

const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (token: string, { dispatch, rejectWithValue }) => {
    const url = 'https://blog.kata.academy/api/user';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
      }
      if (response.status === 422) {
        dispatch(setErrorMessage('Oops! Something went wrong'));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchCurrentUser;
