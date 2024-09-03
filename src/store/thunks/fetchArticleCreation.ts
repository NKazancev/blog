import { createAsyncThunk } from '@reduxjs/toolkit';

import { createArticle } from '../slices/articlesSlice';

type ArticleCreationData = {
  token: string;
  articleData: {
    title: string;
    description: string;
    body: string;
    tagList: Array<string>;
  };
};

const fetchArticleCreation = createAsyncThunk(
  'articles/fetchArticleCreation',
  async (data: ArticleCreationData, { dispatch, rejectWithValue }) => {
    const { token, articleData } = data;
    const url = 'https://blog.kata.academy/api/articles';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: articleData }),
      });
      if (response.ok) {
        const article = await response.json();
        dispatch(createArticle(article.article));
      }
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticleCreation;
