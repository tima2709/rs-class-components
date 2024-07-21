import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../redux/slices/selectedItemsSlice';
import { apiSlice } from '../redux/query/apiSlice';
import { renderHook } from '@testing-library/react-hooks';
import { ReactNode } from 'react';
import { describe, it, expect } from 'vitest';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('hooks', () => {
  it('should use app dispatch', () => {
    const { result } = renderHook(() => useAppDispatch(), { wrapper });
    expect(typeof result.current).toBe('function');
  });

  it('should use app selector', () => {
    const { result } = renderHook(() => useAppSelector((state) => state), {
      wrapper,
    });
    expect(result.current).toEqual(store.getState());
  });
});
