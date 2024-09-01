import { createAsyncThunk } from '@reduxjs/toolkit';

import { setErrorMesage, setOneArticle } from '../slices/articlesSlice';

const fetchArticlePage = createAsyncThunk(
  'articles/fetchArticlePage',
  async (slug: string, { dispatch, rejectWithValue }) => {
    const url = `https://blog.kata.academy/api/articles/${slug}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setOneArticle(data.article));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setErrorMesage('Oops! Something went wrong'));
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticlePage;
