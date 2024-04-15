import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { getUserInformations, login } from "../api/user/auth";

  // Define the initial state using that type
const initialState = {
  isLoading: false,
  user: null, 
  isLoggedIn:false
}

// Manage async so with pending return call
export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async (credentials, thunkApi) => {
    try {
      const user = await login(credentials);
      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// Manage async so with pending return call
export const getInformations = createAsyncThunk(
  'user/informationsAsync',
  async (credentials, thunkApi) => {
    try {
      const user = await getUserInformations(credentials);
      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);


export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = initialState.user;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("payload", action.payload)
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(getInformations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInformations.fulfilled, (action,state) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(getInformations.rejected, (state,) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
  },
})



export const selectUser = (state) => state.user.user;
export const useMercureToken = (state) => state.user.user?.mercure_token
export const useToken=(state) => state.user?.user?.token
export const useIsLoggedIn=(state) => state.user?.isLoggedIn
export const selectIsLoading=(state) => state.user?.isLoading

export const { logout } = UserSlice.actions;



export default UserSlice.reducer;