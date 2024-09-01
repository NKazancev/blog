import { createAsyncThunk } from '@reduxjs/toolkit';

import { setErrorMesage, setOneArticle } from '../slices/articlesSlice';

type ArticlePageAuth = {
  token: string;
  slug: string;
};

const fetchArticlePageAuth = createAsyncThunk(
  'articles/fetchArticlePageAuth',
  async (data: ArticlePageAuth, { dispatch, rejectWithValue }) => {
    const { token, slug } = data;
    const url = `https://blog.kata.academy/api/articles/${slug}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const article = await response.json();
      dispatch(setOneArticle(article.article));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setErrorMesage('Oops! Something went wrong'));
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticlePageAuth;
