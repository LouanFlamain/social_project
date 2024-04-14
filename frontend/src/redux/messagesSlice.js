import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import getMessage from "../api/message/getMessage";

// Define the initial state using that type
const initialState = {
    chatting: {},
  data : [],
  isLoading : false,
  error: false
}

// Manage async so with pending return call
export const getMessagesAsync = createAsyncThunk(
  'messages/getMessages',
  async (payload, thunkApi) => {
    try {
      const messages = await getMessage(payload);
      return messages;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);


export const MessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // On sending or receiving throught Mercure
    addMessage(state, action) {
      state.data = [...state.data, action.payload]
      return 
    },
    addUsers(action, state){
        // A definir
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessagesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("payload", action.payload)
        state.data = action.payload;
        state.error = false;
      })
      .addCase(getMessagesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })
  },
})



export const selectMessages = (state) => state.messages.data;
export const isLoading=(state) => state.messages.isLoading

export const { addMessage } = MessagesSlice.actions;



export default MessagesSlice.reducer;