import { createAsyncThunk } from '@reduxjs/toolkit';

import { setMessage, setUser } from '../slices/userSlice';

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
        localStorage.setItem('user', JSON.stringify(user.user));
      }
      if (response.status === 422) {
        dispatch(setMessage('Oops! Something went wrong.'));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchUserUpdate;
