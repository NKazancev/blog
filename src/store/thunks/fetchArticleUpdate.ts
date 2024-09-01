import { createAsyncThunk } from '@reduxjs/toolkit';

import { setErrorMesage, updateArticle } from '../slices/articlesSlice';

type ArticleUpdateData = {
  token: string;
  slug: string | undefined;
  articleData: {
    title: string;
    description: string;
    body: string;
  };
};

const fetchArticleUpdate = createAsyncThunk(
  'articles/fetchArticleUpdate',
  async (data: ArticleUpdateData, { dispatch, rejectWithValue }) => {
    const { token, slug, articleData } = data;
    const url = `https://blog.kata.academy/api/articles/${slug}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: articleData }),
      });
      if (response.ok) {
        const article = await response.json();
        dispatch(updateArticle(article.article));
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setErrorMesage('Oops! Something went wrong'));
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticleUpdate;
