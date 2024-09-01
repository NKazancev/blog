import { createAsyncThunk } from '@reduxjs/toolkit';

import { setErrorMesage } from '../slices/articlesSlice';

type ArticleLikeData = {
  token: string;
  slug: string | undefined;
};

const fetchArticleLike = createAsyncThunk(
  'articles/fetchFavoriteLike',
  async (data: ArticleLikeData, { dispatch, rejectWithValue }) => {
    const { token, slug } = data;
    const url = `https://blog.kata.academy/api/articles/${slug}/favorite`;

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setErrorMesage('Oops! Something went wrong'));
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticleLike;
