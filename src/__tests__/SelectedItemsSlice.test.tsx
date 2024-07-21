import selectedItemsReducer, {
  selectItem,
  unselectAll,
} from '../redux/slices/selectedItemsSlice';
import { describe, it, expect } from 'vitest';

describe('selectedItemsSlice', () => {
  const initialState = { items: [] };

  it('should handle initial state', () => {
    expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should handle selectItem', () => {
    const actual = selectedItemsReducer(
      initialState,
      selectItem({ id: '1', name: 'test' }),
    );
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0]).toEqual({ id: '1', name: 'test' });
  });

  it('should handle unselectAll', () => {
    const stateWithItems = { items: [{ id: '1', name: 'test' }] };
    const actual = selectedItemsReducer(stateWithItems, unselectAll());
    expect(actual.items.length).toEqual(0);
  });
});
