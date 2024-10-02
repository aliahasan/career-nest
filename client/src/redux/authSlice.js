import { createSlice } from "@reduxjs/toolkit";

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
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, updateUser } = authSlice.actions;
export default authSlice.reducer;
