import { createAsyncThunk } from '@reduxjs/toolkit';

import { addArticles, setArticlesNumber } from '../slices/articlesSlice';

type ArticlesDataAuth = {
  token: string;
  offset: number;
};

const fetchArticlesAuth = createAsyncThunk(
  'articles/fetchArticlesAuth',
  async (data: ArticlesDataAuth, { dispatch, rejectWithValue }) => {
    const { token, offset } = data;
    const url = `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const articles = await response.json();
        dispatch(addArticles(articles.articles));
        dispatch(setArticlesNumber(articles.articlesCount));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticlesAuth;
