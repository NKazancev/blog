import { createSlice } from '@reduxjs/toolkit';

import { IArticle } from 'models/article';

interface IArticlesState {
  articles: Array<IArticle> | null;
  articlesNumber: number;
  article: IArticle | null;
  isCreated: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  errorMessage: string;
  loadingStatus: string;
}

const initialState: IArticlesState = {
  articles: [],
  articlesNumber: 0,
  article: null,
  isCreated: false,
  isDeleted: false,
  isUpdated: false,
  errorMessage: '',
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
    setOneArticle(state, action) {
      state.article = action.payload;
    },
    createArticle(state, action) {
      if (state.articles) state.articles.push(action.payload);
      state.isCreated = true;
    },
    updateArticle(state, action) {
      if (state.articles) state.articles.push(action.payload);
      state.isUpdated = true;
    },
    deleteArticle(state) {
      state.isDeleted = true;
    },
    removeArticle(state) {
      state.article = null;
    },
    removeArticles(state) {
      state.articles = null;
    },
    setErrorMesage(state, action) {
      state.errorMessage = action.payload;
    },
    resetStatus(state) {
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
    },
  },
});

export default articlesSlice.reducer;
export const {
  addArticles,
  setArticlesNumber,
  setOneArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  removeArticle,
  removeArticles,
  setErrorMesage,
  resetStatus,
} = articlesSlice.actions;
