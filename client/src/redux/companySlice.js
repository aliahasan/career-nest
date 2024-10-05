import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    recruiterCompanies: [],
    searchCompany: "",
  },
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setRecruiterCompanies: (state, action) => {
      state.recruiterCompanies = action.payload;
    },
    setSearchCompany: (state, action) => {
      state.searchCompany = action.payload;
    },
  },
});
export const { setCompanies, setRecruiterCompanies, setSearchCompany } =
  companySlice.actions;
export default companySlice.reducer;
