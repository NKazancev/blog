import { createAsyncThunk } from '@reduxjs/toolkit';

import { setOneArticle } from '../slices/articlesSlice';

const fetchArticlePage = createAsyncThunk(
  'articles/fetchArticlePage',
  async (slug: string, { dispatch, rejectWithValue }) => {
    const url = `https://blog.kata.academy/api/articles/${slug}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        dispatch(setOneArticle(data.article));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticlePage;
