import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteArticle, setErrorMesage } from '../slices/articlesSlice';

type ArticleDeletionData = {
  token: string;
  slug: string | undefined;
};

const fetchArticleDeletion = createAsyncThunk(
  'articles/fetchArticleDeletion',
  async (data: ArticleDeletionData, { dispatch, rejectWithValue }) => {
    const { token, slug } = data;
    const url = `https://blog.kata.academy/api/articles/${slug}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        dispatch(deleteArticle());
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setErrorMesage('Oops! Something went wrong'));
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticleDeletion;
