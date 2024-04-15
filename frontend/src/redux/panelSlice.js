import { createSlice } from "@reduxjs/toolkit";

const initialState = "chat";

export const panelSlice = createSlice({
  name: "panel", // Utilisé en interne pour nommer mes actions
  initialState: initialState, // Mon état initial
  reducers: {
    // Tous mes reducers
    changePanel: (state, action) => {
      return action.payload;
    },
  },
});

export const { changePanel } = panelSlice.actions;

export default panelSlice.reducer;

export const selectPanel = (state) => state.panel;
