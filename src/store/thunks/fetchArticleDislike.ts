import { createAsyncThunk } from '@reduxjs/toolkit';

type ArticleLikeData = {
  token: string;
  slug: string | undefined;
};

const fetchArticleDislike = createAsyncThunk(
  'articles/fetchArticleDislike',
  async (data: ArticleLikeData, { rejectWithValue }) => {
    const { token, slug } = data;
    const url = `https://blog.kata.academy/api/articles/${slug}/favorite`;

    try {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default fetchArticleDislike;
