import store from '../redux/store';
import selectedItemsReducer from '../redux/slices/selectedItemsSlice';
import { describe, it, expect } from 'vitest';

describe('store', () => {
  it('should have api reducer', () => {
    const state = store.getState();
    expect(state.api).toBeDefined();
  });

  it('should have selectedItems reducer', () => {
    const state = store.getState();
    expect(state.selectedItems).toEqual(
      selectedItemsReducer(undefined, { type: 'unknown' }),
    );
  });
});
