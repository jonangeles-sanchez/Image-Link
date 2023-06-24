import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import imagelinkReducer from "../features/imagelink/imagelinkSlice";
import imagecodeSlice from "../features/imagecode/imagecodeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    imagelink: imagelinkReducer,
    imagecode: imagecodeSlice,
  },
});
