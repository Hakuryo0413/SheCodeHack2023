import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobsInterface } from "../../../../types/JobInterface";

interface CofounderJobsState {
  cofounderJobs: JobsInterface[];
  change: boolean;
}

const initialState: CofounderJobsState = {
  cofounderJobs: [],
  change: false,
};

const cofounderJobsSlice = createSlice({
  name: "cofounderJobs",
  initialState,
  reducers: {
    setCofounderJobs: (state, action: PayloadAction<JobsInterface[]>) => {
      state.cofounderJobs = action.payload;
    },
    clearCofounderJobs: (state) => {
      state.cofounderJobs = [];
    },
    deleted: (state) => {
      state.change = !state.change;
    },
  },
});

export const { setCofounderJobs, clearCofounderJobs, deleted } =
  cofounderJobsSlice.actions;
export default cofounderJobsSlice.reducer;
