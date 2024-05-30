import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api_key = import.meta.env.VITE_API_KEY;

const initialState = {
  type: "png",
  dataUrl: "",
  dimension: "500",
  foregroundColor: "000000",
  backgroundColor: "FFFFFF",
  data: null,
  isLoading: false,
  isError: false,
};

export const fetchQrImageUrl = createAsyncThunk(
  "fetchQrImage",
  async ({ type, dataUrl, dimension, foregroundColor, backgroundColor }) => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/qrcode?format=${type}&data=${dataUrl}&size=${dimension}&fg_color=${foregroundColor}&bg_color=${backgroundColor}`,
        {
          headers: {
            "X-Api-Key": api_key,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const QrSlice = createSlice({
  name: "QrSlice",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setDataUrl: (state, action) => {
      state.dataUrl = action.payload;
    },
    setDimension: (state, action) => {
      state.dimension = action.payload;
    },
    setForegroundColor: (state, action) => {
      state.foregroundColor = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQrImageUrl.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchQrImageUrl.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(fetchQrImageUrl.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.data = null;
    });
  },
});

export const {
  setType,
  setDataUrl,
  setDimension,
  setForegroundColor,
  setBackgroundColor,
} = QrSlice.actions;

export default QrSlice.reducer;
