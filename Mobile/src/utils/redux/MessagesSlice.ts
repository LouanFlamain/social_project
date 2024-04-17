
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Message, MessagesListSuccessfulResponse, MessagesListUnsuccessfulResponse } from './hook'
import { CreateMessage, getMessages } from '../services/MessageService';
import { RootState } from './Store';


interface MessagesSlice {
    isLoading: boolean,
    messages? : Array<Message> | null,
    IsSuccess? : boolean | null
  }


  // Define the initial state using that type
const initialState: MessagesSlice = {
    isLoading: false,
    messages : [],
    IsSuccess:false
}

export const SendMessages = createAsyncThunk<MessagesListSuccessfulResponse, {token: string, userId: number, roomId: number, value : string }, { rejectValue: MessagesListUnsuccessfulResponse }>(
    'messages/sendMessages',
    async ({token, userId, roomId, value}, thunkApi) => {
      try {
      console.log("utoriiris")
      const messages = await CreateMessage(token, userId, roomId, value);
        return messages;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  

  export const GetMessages = createAsyncThunk<MessagesListSuccessfulResponse, {token: string, userId: number, roomId: number}, { rejectValue: MessagesListUnsuccessfulResponse }>(
    'messages/getMessages',
    async ({token, userId, roomId}, thunkApi) => {
      try {
      const messages = await getMessages(token, userId, roomId);
        return messages;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  const compareByDate = (a, b) => {
    // Convertir les dates de création en objets Date
    const dateA = new Date(a.createdAt.date);
    const dateB = new Date(b.createdAt.date);
  
    // Comparer les dates
    return dateB - dateA;
};



  export const MessagesSlice = createSlice({
    name: 'messages',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      addMessages(state, action){
        state.messages?.push(action.payload)
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(SendMessages.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(SendMessages.fulfilled, (state, action) => {
          state.isLoading = false;
          state.IsSuccess = true;
        })
        .addCase(SendMessages.rejected, (state, action) => {
          state.isLoading = false;
          state.IsSuccess = false;
        })
        
        .addCase(GetMessages.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(GetMessages.fulfilled, (state, action) => {
          state.isLoading = false;
          state.messages =  action.payload.data.sort(compareByDate)
          state.IsSuccess = true;
        })
        .addCase(GetMessages.rejected, (state, action) => {
          state.isLoading = false;
          state.IsSuccess = false;
        });
        
    },

  })

  export const selectIsLoading = (state: RootState) => state.messages.isLoading;

  export const selectisSuccess = (state: RootState) => state.messages.IsSuccess;

  export const selectMessages = (state: RootState) => state.messages.messages;



  export const { addMessages } = MessagesSlice.actions;


  export default MessagesSlice.reducer