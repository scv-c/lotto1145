import { combineSlices, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserWithMaxSource } from "../api/user";

export const getUserListSlice = createAsyncThunk(
  "user/getUserList",
  async () => {
    return await getUserWithMaxSource();
  }
);

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    userListForRank: [], //랭킹을 위한 배열이며, 그것만을 위해 사용합니다.
    status: "idle",
    updateAt : null,
    error: null,
  },
  reducers: {
    setUserListForRank(state, action) {
      state.userListForRank = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserListSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserListSlice.fulfilled, (state, action) => {
        state.status = "success";
        state.userListForRank = action.payload.data;
        state.updateAt = action.payload.timestamp;
      })
      .addCase(getUserListSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUserListForRank } = userListSlice.actions;
export default userListSlice.reducer;
