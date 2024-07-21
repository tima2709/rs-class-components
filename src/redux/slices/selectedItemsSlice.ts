import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemType {
  id: string;
  name: string;
}

interface SelectedItemsSlice {
  items: ItemType[];
}

const initialState: SelectedItemsSlice = {
  items: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<ItemType>) => {
      const exist = state.items.find((item) => item.id === action.payload.id);
      if (exist) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.items.push(action.payload);
      }
    },
    unselectAll: (state) => {
      state.items = [];
    },
  },
});

export const { selectItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
