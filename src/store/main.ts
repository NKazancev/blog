import { combineReducers, configureStore } from '@reduxjs/toolkit';

import articlesSlice from './slices/articlesSlice';

const rootReducer = combineReducers({
  articlesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
