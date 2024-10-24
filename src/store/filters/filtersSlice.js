import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  petType: "",
  location: "",
  breed: "",
  userType: "",
  age: "",
  minPrice: "",
  maxPrice: "",
  isFree: false,
  gender: "",
  health: [],
  documents: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPetType: (state, action) => {
      state.petType = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    // ... other reducers for updating filters
	 resetFilters: (state, action) => {
		state.petType = "";
		state.location = "";
		state.breed = "";
		state.userType = "";
		state.age = "";
		state.minPrice = "";
		state.maxPrice = "";
		state.isFree = false;
		state.gender = "";
		state.health = [];
		state.documents = [];
		return state; // Return the updated state
	 },
    updateFilter: (state, action) => {
      const { filterName, filterValue } = action.payload;
      if (Array.isArray(state[filterName])) {
        // If it's an array filter, update the array
        state[filterName] = filterValue; // Assuming newValue is the new array
      } else {
        // If it's a single value filter, update the value
        state[filterName] = filterValue;
      }
    },
  },
});

export const {
  setPetType,
  setLocation,
  resetFilters,
  updateFilter,
  // ... other actions
} = filterSlice.actions;
export default filterSlice.reducer;
