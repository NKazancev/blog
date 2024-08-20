import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IArticle } from 'models/article';

interface IArticlesState {
  articles: Array<IArticle>;
  articlesNumber: number;
  loadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: IArticlesState = {
  articles: [],
  articlesNumber: 0,
  loadingStatus: 'idle',
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticles(state, action) {
      state.articles = action.payload;
    },
    setArticlesNumber(state, action) {
      state.articlesNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loadingStatus = 'pending';
      })
      .addCase(fetchArticles.fulfilled, (state) => {
        state.loadingStatus = 'succeeded';
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.loadingStatus = 'failed';
      });
  },
});

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (offset: number, { dispatch, rejectWithValue }) => {
    const url = `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(addArticles(data.articles));
      dispatch(setArticlesNumber(data.articlesCount));
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      }
    }
  }
);

export default articlesSlice.reducer;
export const { addArticles, setArticlesNumber } = articlesSlice.actions;
