import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [
    'United States',
    'Canada',
    'Mexico',
    'Germany',
    'France',
    'Kyrgyzstan',
    'Russia',
    'Kazakhstan',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
