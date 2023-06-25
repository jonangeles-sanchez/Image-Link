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

export const createImageLink = createAsyncThunk(
  "imagelinks/createImageLink",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await imagelinkService.createImageLink(token, data);
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

// Update imagelink by id
export const updateImageLink = createAsyncThunk(
  "imagelinks/updateImageLink",
  async ({ data, id }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await imagelinkService.updateImageLink(token, data, id);
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

// Delete imagelink by id
export const deleteImageLink = createAsyncThunk(
  "imagelinks/deleteImageLink",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await imagelinkService.deleteImageLink(token, id);
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

// Delete an image from imagelink by id
export const deleteImageFromImageLink = createAsyncThunk(
  "imagelinks/deleteImageFromImageLink",
  async ({ id, imageId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      for (let i = 0; i < imageId.length; i++) {
        await imagelinkService.deleteImageFromImageLink(token, id, imageId[i]);
      }
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

// Get a single imagelink by id
export const getSingleImageLink = createAsyncThunk(
  "imagelinks/getSingleImageLink",
  async (id) => {
    try {
      return await imagelinkService.getSingleImageLink(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
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
      })
      .addCase(createImageLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createImageLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = action.payload;
      })
      .addCase(createImageLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(updateImageLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateImageLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = action.payload;
      })
      .addCase(updateImageLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(deleteImageLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImageLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = action.payload;
      })
      .addCase(deleteImageLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(deleteImageFromImageLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImageFromImageLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.links = action.payload;
      })
      .addCase(deleteImageFromImageLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getSingleImageLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleImageLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleLink = action.payload;
      })
      .addCase(getSingleImageLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = imagelinkSlice.actions;
export default imagelinkSlice.reducer;
