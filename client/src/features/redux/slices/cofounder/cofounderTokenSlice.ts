import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  cofounderToken: string | null;
}

const loadTokenFromLocalStorage = (): string | null => {
  try {
    const token = localStorage.getItem("CofounderToken");
    return token ? token : null;
  } catch (error) {
    console.log("Error loading token from local storage:", error);
    return null;
  }
};

const initialState: TokenState = {
  cofounderToken: loadTokenFromLocalStorage(),
};

const cofounderTokenSlice = createSlice({
  name: "cofounderToken",
  initialState,
  reducers: {
    setCofounderToken: (state, action: PayloadAction<string>) => {
      state.cofounderToken = action.payload;
      try {
        localStorage.setItem("CofounderToken", action.payload);
      } catch (error) {
        console.log("Error storing token in local storage:", error);
      }
    },
    clearCofounderToken: (state) => {
      state.cofounderToken = null;
      try {
        localStorage.removeItem("CofounderToken");
      } catch (error) {
        console.log("Error removing token from local storage:", error);
      }
    },
  },
});

export const { setCofounderToken, clearCofounderToken } =
  cofounderTokenSlice.actions;
export default cofounderTokenSlice.reducer;
