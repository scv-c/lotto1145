import { createSlice } from "@reduxjs/toolkit";

const lottoSlice = createSlice({
  name: "lotto",
  initialState: {
    newLottoList: [],
    historyLottoList: [],
  },
  reducers: {
    setNewLottoList(state, action) {
      state.newLottoList = action.payload;
    },
    setHistoryLottoList(state, action) {
      state.historyLottoList = [...action.payload, ...state.historyLottoList];
    },
  },
});

export const { setNewLottoList, setHistoryLottoList } = lottoSlice.actions;
export default lottoSlice.reducer;
