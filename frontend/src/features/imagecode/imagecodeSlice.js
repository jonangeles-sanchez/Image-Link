import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imagecodeService from "./imagecodeService";

const code = JSON.parse(localStorage.getItem("code"));

const initialState = {
  code: code ? code : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createImageLinkCode = createAsyncThunk(
  "imagecode/createImageLinkCode",
  async (data, thunkAPI) => {
    try {
      return await imagecodeService.createImageLinkCode(data);
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

export const getImageLinkCode = createAsyncThunk(
  "imagecode/getImageLinkCode",
  async (data, thunkAPI) => {
    try {
      return await imagecodeService.getImageLinkCode(data);
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

export const imagecodeSlice = createSlice({
  name: "imagecode",
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
      .addCase(createImageLinkCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createImageLinkCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.code = action.payload;
      })
      .addCase(createImageLinkCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.code = null;
      })
      .addCase(getImageLinkCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getImageLinkCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.code = action.payload;
      })
      .addCase(getImageLinkCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.code = null;
      });
  },
});

export const { reset } = imagecodeSlice.actions;
export default imagecodeSlice.reducer;
