import { createSlice } from '@reduxjs/toolkit';


const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { isNotOpened: false },
  reducers: {
    toggleSidebar: (state) => {
      state.isNotOpened = !state.isNotOpened
    }
  }
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;