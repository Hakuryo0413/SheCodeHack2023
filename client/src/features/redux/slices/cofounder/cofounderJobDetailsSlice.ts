import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { JobsInterface } from "../../../../types/JobInterface";
import { jobDetailsCofounder } from "../../../axios/api/cofounder/jobDetailsCofounder";

export const fetchCofounderJobDetails = createAsyncThunk(
  "cofounderJob/fetchJob",
  async (id: string) => {
    if (id) {
      const response = await jobDetailsCofounder(id);
      return response;
    }
  }
);

interface CofounderJobDetailsSlice {
  jobId: string | null;
  jobDetails: JobsInterface | null;
  error: string | null;
  status: string;
}

const initialState: CofounderJobDetailsSlice = {
  jobId: null,
  jobDetails: null,
  error: null,
  status: "idle",
};

const cofounderJobDetailsSlice = createSlice({
  name: "cofounderJobDetails",
  initialState,
  reducers: {
    clearCofounderJobDetails: (state) => {
      state.jobDetails = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setCofounderJobId: (state, action: PayloadAction<string>) => {
      state.jobId = action.payload;
    },
    clearCofounderJobId: (state) => {
      state.jobId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCofounderJobDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCofounderJobDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobDetails = action.payload;
      })
      .addCase(fetchCofounderJobDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "";
      });
  },
});

export const {
  clearCofounderJobDetails,
  setError,
  setCofounderJobId,
  clearCofounderJobId,
} = cofounderJobDetailsSlice.actions;

export default cofounderJobDetailsSlice.reducer;
