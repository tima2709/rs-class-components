import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inputs } from '../../pages/react-hook';

interface InputFormState {
  data: Inputs[];
}

const initialState: InputFormState = {
  data: [],
};

const inputFormSlice = createSlice({
  name: 'inputForm',
  initialState,
  reducers: {
    setInputData(state, action: PayloadAction<Inputs>) {
      state.data.push(action.payload);
    },
  },
});

export const { setInputData } = inputFormSlice.actions;
export default inputFormSlice.reducer;
