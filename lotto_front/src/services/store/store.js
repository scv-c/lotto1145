import { configureStore } from '@reduxjs/toolkit';
import lottoReducer from './lottoSlice.js'
import uuidReducer from './uuidSlice.js'

export const store = configureStore({
  reducer: {
    lotto: lottoReducer,
    uuid: uuidReducer
  },
});
