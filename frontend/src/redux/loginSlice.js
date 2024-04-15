import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const loginSlice = createSlice({
  name: "login", // Utilisé en interne pour nommer mes actions
  initialState: initialState, // Mon état initial
  reducers: {
    // Tous mes reducers
    changeLogin: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeLogin } = loginSlice.actions;

export default loginSlice.reducer;

export const selectLogin = (state) => state.login;
