import { createSlice } from "@reduxjs/toolkit";

const seqLottoSlice = createSlice({
  name: "seqLotto",
  initialState: {
    No : null,
    Seq: null,
    seqLottoList : []    
  },
  reducers: {
    setSeqLottoInfo(state, action) {
      const {No, Seq, ...lottoList} = action.payload;
      state.No = No;
      state.Seq = Seq;
      state.seqLottoList = lottoList;
    }
  },
});

export const { setSeqLottoInfo } = seqLottoSlice.actions;
export default seqLottoSlice.reducer;
