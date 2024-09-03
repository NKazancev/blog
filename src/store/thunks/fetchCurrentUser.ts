import { createAsyncThunk } from '@reduxjs/toolkit';

import { setUser } from '../slices/userSlice';

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
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchCurrentUser;
