import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const startSlice = createSlice({
  name: "start", // Utilisé en interne pour nommer mes actions
  initialState: initialState, // Mon état initial
  reducers: {
    // Tous mes reducers
    changeStart: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeStart } = startSlice.actions;

export default startSlice.reducer;

export const selectStart = (state) => state.start;
