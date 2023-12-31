import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loading: true,
    token: null,
    userInfo: {
      uid: null,
    },
    error: null,
  },
  reducers: {
    authenticateStart: (state, action) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    authenticateSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userInfo.uid = action.payload.uid;
      state.loading = false;
      state.isAuthenticated = true;
    },
    authenticateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      console.log(action.payload);
    },
    logout: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      AsyncStorage.removeItem("refreshToken");
      AsyncStorage.removeItem("tokenExpiry");
    },
  },
});

export const {
  authenticateStart,
  authenticateSuccess,
  authenticateFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
