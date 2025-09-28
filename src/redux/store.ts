import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

//REDUCERS
import userReducer from "./features/userSlice";
import couponReducer from "./features/couponSlice";

//APIS
import { baseApi } from "./services/baseApi";
export const store = configureStore({
  reducer: {
    userReducer,
    couponReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([baseApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
