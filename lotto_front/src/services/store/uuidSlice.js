import { createSlice } from "@reduxjs/toolkit";

const uuidSlice = createSlice({
    name: 'user',
    initialState: {
        uuid:""
    },
    reducers:{
        setUUID(state, action) {
            state.uuid = action.payload;
        }
    }
});

export const { setUUID } = uuidSlice.actions;
export default uuidSlice.reducer;