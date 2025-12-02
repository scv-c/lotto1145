import { configureStore } from '@reduxjs/toolkit';
import lottoReducer from './lottoSlice.js'
import userSlice from './userSlice.js'
import userListReducer from './userListSlice.js'
import seqLottoReducer from './seqLottoSlice.js'

export const store = configureStore({
  reducer: {
    lotto: lottoReducer,
    user: userSlice,
    userList: userListReducer,
    seqLotto : seqLottoReducer
  },
});
