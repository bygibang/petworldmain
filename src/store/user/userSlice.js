import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: {
    isAdmin:localStorage.getItem('isAdmin') || false,
    isUser: JSON.parse(localStorage.getItem("user")) || null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user.isUser = action.payload;
    },
    logout: (state, action) => {
      state.user.isUser = action.payload;
    },
	 checkAdmin:(state, action) => {
		state.user.isAdmin = action.payload
	 }
  },
});

export default userSlice.reducer;
export const { login } = userSlice.actions;
