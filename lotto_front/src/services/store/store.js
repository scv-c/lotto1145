import { configureStore } from '@reduxjs/toolkit';
import lottoReducer from './lottoSlice.js'
import uuidReducer from './uuidSlice.js'
import userListReducer from './userListSlice.js'
import seqLottoReducer from './seqLottoSlice.js'

export const store = configureStore({
  reducer: {
    lotto: lottoReducer,
    uuid: uuidReducer,
    userList: userListReducer,
    seqLotto : seqLottoReducer
  },
});
