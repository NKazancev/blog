import { createAsyncThunk } from '@reduxjs/toolkit';

import { setOneArticle } from '../slices/articlesSlice';

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
      if (response.ok) {
        const article = await response.json();
        dispatch(setOneArticle(article.article));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticlePageAuth;
