import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../../api/transportApi";
import type { UserProfile, LoginCredentials } from "../../types";

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    const response = await loginUser(credentials);
    const user: UserProfile = {
      username: response.username,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
    };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (response.token) {
      await AsyncStorage.setItem("token", response.token);
    }
    return user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      void AsyncStorage.removeItem("user");
      void AsyncStorage.removeItem("token");
    },
    restoreUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.isAuthenticated = Boolean(action.payload);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout, restoreUser } = authSlice.actions;
export default authSlice.reducer;
