import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import imagelinkReducer from "../features/imagelink/imagelinkSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    imagelink: imagelinkReducer,
  },
});
