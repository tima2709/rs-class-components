import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import countriesReducer from './slices/countriesSlice';
import inputFormReducer from './slices/inputFormSlice';
import uncontrolledReducer from './slices/uncontrolledSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  countries: countriesReducer,
  controlledData: inputFormReducer,
  uncontrolledData: uncontrolledReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
