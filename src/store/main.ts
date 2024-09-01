import { combineReducers, configureStore } from '@reduxjs/toolkit';

import articlesSlice from './slices/articlesSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  articlesSlice,
  userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
