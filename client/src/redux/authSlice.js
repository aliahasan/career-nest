import { createSlice } from "@reduxjs/toolkit";
import { logout, signInWithGoogle } from "./firebaseUser";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
