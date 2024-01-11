import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import roomSlice from "./roomSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    room: roomSlice,
  },
});
