import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../api/user";

export const getUserSlice = createAsyncThunk("user/getUser", async () => {
  return await getUser();
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    No: null,
    UUID: null,
    MaxScore: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUUID(state, action) {
      state.UUID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserSlice.fulfilled, (state, action) => {
        state.status = "success";
        Object.assign(state, action.payload.data);
      })
      .addCase(getUserSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUUID } = userSlice.actions;
export default userSlice.reducer;
