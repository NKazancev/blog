import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  addArticles,
  setArticlesNumber,
  setErrorMesage,
} from '../slices/articlesSlice';

const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (offset: number, { dispatch, rejectWithValue }) => {
    const url = `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        dispatch(addArticles(data.articles));
        dispatch(setArticlesNumber(data.articlesCount));
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setErrorMesage('Oops! Something went wrong'));
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticles;
