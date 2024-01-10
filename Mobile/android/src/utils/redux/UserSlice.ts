import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './store'
import { UserSuccessfulResponse, UserUnsuccessfullResponse } from './hook'
import { login } from '../services/UserService'
import { Creation_Date } from './hook';

// Define a type for the slice state
interface UserSlice {
  isLoading: boolean,
  user?: User | null,
  IsSuccess?:boolean | null
}

export interface User {
    id?: number, 
    image?: string,
    token?:string,
    mercure_token?:string,
    email?: string,
    username?: string,
    creation_date?:Creation_Date
  }

// Define the initial state using that type
const initialState: UserSlice = {
    isLoading: false,
    user:null,
    IsSuccess:false
}



export const loginAsync = createAsyncThunk<UserSuccessfulResponse, { username: string; password: string }, { rejectValue: UserUnsuccessfullResponse }>(
    'user/loginAsync',
    async (credentials, thunkApi) => {
      try {
        console.log(credentials)
        const user = login(credentials);
        return user;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );


export const UserSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout(state) {
      state.user = initialState.user;
      state.IsSuccess = false;
      state.isLoading = false;
      console.log("ici")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.IsSuccess = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.IsSuccess = false;
      });
  },
})

export const selectState = (state: RootState) => state.user;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoggedIn = (state: RootState) => state.user.IsSuccess;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const useToken = (state: RootState) => state.user.user?.token;
export const useId = (state: RootState) => state.user.user?.id;
export const selectMercureToken = (state: RootState) => state.user.user?.mercure_token;


export const { logout } = UserSlice.actions;





// Other code such as selectors can use the imported `RootState` type

export default UserSlice.reducer