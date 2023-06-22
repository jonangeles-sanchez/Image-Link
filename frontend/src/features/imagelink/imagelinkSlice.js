import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imagelinkService from "./imagelinkService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  links: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const getAllLinks = createAsyncThunk(
  "imagelinks/getAllLinks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await imagelinkService.getImageLinks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const imagelinkSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLinks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = action.payload;
      })
      .addCase(getAllLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = imagelinkSlice.actions;
export default imagelinkSlice.reducer;
