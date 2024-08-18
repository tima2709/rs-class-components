import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inputs } from '../../pages/react-hook';

interface InputFormState {
  data: Inputs[];
}

const initialState: InputFormState = {
  data: [],
};

const inputFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setUncontrolledData(state, action: PayloadAction<Inputs>) {
      state.data.push(action.payload);
    },
  },
});

export const { setUncontrolledData } = inputFormSlice.actions;
export default inputFormSlice.reducer;
