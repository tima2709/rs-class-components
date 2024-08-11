// redux/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiSlice } from './query/apiSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';

const makeStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      selectedItems: selectedItemsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default makeStore;
