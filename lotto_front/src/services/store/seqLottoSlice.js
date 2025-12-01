import { createSlice } from "@reduxjs/toolkit";

const seqLottoSlice = createSlice({
  name: "seqLotto",
  initialState: {
    seq: null,
    seqLottoList : []    
  },
  reducers: {
    setSeqLottoInfo(state, action) {
      const {No, Seq, ...lottoList} = action.payload;
      state.seq = Seq;
      state.seqLottoList = lottoList;
    }
  },
});

export const { setSeqLottoInfo } = seqLottoSlice.actions;
export default seqLottoSlice.reducer;
