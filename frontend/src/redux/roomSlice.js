import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const roomSlice = createSlice({
  name: "room", // Utilisé en interne pour nommer mes actions
  initialState: initialState, // Mon état initial
  reducers: {
    // Tous mes reducers
    changeRoom: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeRoom } = roomSlice.actions;

export default roomSlice.reducer;

export const selectRoom = (state) => state.room;
