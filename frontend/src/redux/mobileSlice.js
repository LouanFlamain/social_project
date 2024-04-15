import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const mobileSlice = createSlice({
  name: "mobile", // Utilisé en interne pour nommer mes actions
  initialState: initialState, // Mon état initial
  reducers: {
    // Tous mes reducers
    changeMobile: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeMobile } = mobileSlice.actions;

export default mobileSlice.reducer;

export const selectMobile = (state) => state.mobile;
