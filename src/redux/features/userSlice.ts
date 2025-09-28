import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../services/userApi";

type TUserState = {
  isAuth: boolean;
  user: TUser | null;
};

const initialState: TUserState = {
  isAuth: false,
  user: null,
};

export const User = createSlice({
  name: "User",
  initialState,
  reducers: {
    logOut: (state) => {
      state = initialState;
    },
    logIn: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});

export const { logIn, logOut } = User.actions;
export default User.reducer;
