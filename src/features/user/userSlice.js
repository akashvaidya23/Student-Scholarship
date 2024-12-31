import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("token") || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      console.log("login", action.payload.id);
      state.user = action.payload.id;
    },
    userLogout: (state) => {
      console.log("logout", state);
      state.user = null;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
