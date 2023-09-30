import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { cofounderData } from "../../../axios/api/cofounder/cofounderDetails";

export const fetchCofounder = createAsyncThunk(
  "cofounder/fetchCofounder",
  async () => {
    const response = await cofounderData();
    return response;
  }
);

interface CofounderDetailsState {
  cofounderEmail: string | null;
  cofounderDetails: any;
  error: string | null;
  status: string;
  isLoggedIn: boolean;
}

const initialState: CofounderDetailsState = {
  cofounderEmail: null,
  cofounderDetails: null,
  error: null,
  status: "idle",
  isLoggedIn: false,
};

const cofounderDetailsSlice = createSlice({
  name: "cofounderDetails",
  initialState,
  reducers: {
    clearCofounderDetails: (state) => {
      state.cofounderDetails = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    cofounderLoginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    cofounderLogout: (state) => {
      state.isLoggedIn = false;
    },
    cofounderEmail: (state, action: PayloadAction<string>) => {
      state.cofounderEmail = action.payload;
    },
    clearCofounderEmail: (state) => {
      state.cofounderEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCofounder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCofounder.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.cofounderDetails = action.payload;
        }
      )
      .addCase(fetchCofounder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const {
  clearCofounderDetails,
  setError,
  cofounderLoginSuccess,
  cofounderLogout,
  cofounderEmail,
  clearCofounderEmail,
} = cofounderDetailsSlice.actions;

export default cofounderDetailsSlice.reducer;
