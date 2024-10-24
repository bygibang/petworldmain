import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import filtersSlice from "./filters/filtersSlice";


export const store = configureStore({
	reducer: {
		user: userReducer,
		filters: filtersSlice,
	}
})