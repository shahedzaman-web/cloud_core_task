
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { reduxStorage } from '../utils/mmkvConfig';
import rootReducers from './reducers/rootReducers';
import { apiSlice } from './services/apiSlice';
import authSlice from './slices/authSlice';

const persistConfig = {
  key: '@root',
  version: 1,
  storage: reduxStorage,
  whitelist: [
    authSlice.name,

  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;