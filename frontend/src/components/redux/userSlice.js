import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user", // Utilisé en interne pour nommer mes actions
  initialState: initialState, // Mon état initial
  reducers: {
    // Tous mes reducers
    addUser: (state, action) => {
      return action.payload;
    },
    deleteUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user;
