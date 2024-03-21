import { createSlice } from "@reduxjs/toolkit";

export interface DoubleClickStatus {
  songid: string;
}

const initialState: DoubleClickStatus = {
  songid: "",
};

const DoubleClickSlice = createSlice({
  name: "doubleclickplay",
  initialState,
  reducers: {
    updateStatus: (state, { payload }) => {
      state.songid = payload;
    },
  },
});

export const { updateStatus } = DoubleClickSlice.actions;

export default DoubleClickSlice.reducer;
